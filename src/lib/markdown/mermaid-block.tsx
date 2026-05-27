"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import mermaid from "mermaid";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import {
  Check,
  Code2,
  Copy,
  PanelBottomClose,
  Maximize2,
  Minimize2,
  MousePointer2,
  RotateCcw,
  Minus,
  Plus,
  ScanSearch,
  Split,
  Undo2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { copyText } from "./copy";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "inherit",
});

type ToolMode = "select" | "zoom";
type DragBox = {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  shiftKey: boolean;
  ctrlKey: boolean;
};
type MiddlePan = {
  startClientX: number;
  startClientY: number;
  startPositionX: number;
  startPositionY: number;
};
type EdgeRecord = {
  element: SVGElement;
  source?: string;
  target?: string;
};
type SourceEdge = {
  source: string;
  target: string;
  arrow: string;
};
type SubgraphBlock = {
  id: string;
  headerLine: string;
  direction: string | null;
  nodeIds: string[];
};
type SourceGraph = {
  initLines: string[];
  headerLine: string;
  nodeIds: string[];
  nodeLines: Map<string, string>;
  edges: SourceEdge[];
  subgraphs: SubgraphBlock[];
  nodeSubgraph: Map<string, string>;
};
type ViewFilter = {
  isolatedNodeIds: string[] | null;
  neighborHops: number;
};

const DEFAULT_VIEW_FILTER: ViewFilter = {
  isolatedNodeIds: null,
  neighborHops: 0,
};

const COPY_RESET_DELAY_MS = 2000;
const MAX_NEIGHBOR_HOPS = 8;

const DIAGRAM_TOOLBAR_BTN =
  "inline-flex size-8 shrink-0 items-center justify-center rounded border p-0 transition-colors hover:bg-zinc-800 hover:text-white";
const DIAGRAM_TOOLBAR_BTN_ACTIVE = "border-indigo-400 bg-indigo-500/20 text-indigo-200";
const DIAGRAM_TOOLBAR_BTN_IDLE = "border-zinc-700 bg-zinc-900/95 text-zinc-400";

export function isMermaid(code: string, language?: string) {
  const normalizedLanguage = language?.toLowerCase();

  if (normalizedLanguage === "mermaid" || normalizedLanguage === "mmd" || normalizedLanguage === "mermaid-js") {
    return true;
  }

  return /^\s*(%%\{init:|flowchart|graph|sequenceDiagram|classDiagram|stateDiagram|erDiagram|journey|gantt|pie|mindmap|timeline|quadrantChart|requirementDiagram|gitGraph|C4Context)\b/.test(
    code
  );
}

function normalizeMermaidId(id: string) {
  return id
    .replace(/^flowchart-/, "")
    .replace(/^(?:L-|LS-|LE-)/, "")
    .replace(/-\d+$/, "");
}

function getNodeIdFromElement(element: Element) {
  const sourceId = element.getAttribute("data-id") ?? element.getAttribute("id");
  return sourceId ? normalizeMermaidId(sourceId) : null;
}

function getNodeElementFromTarget(target: Element) {
  return target.closest<SVGGElement>("g.node[id]");
}

function getEndpointFromClassList(element: Element, prefix: "LS-" | "LE-") {
  const className = Array.from(element.classList).find((item) => item.startsWith(prefix));
  return className ? normalizeMermaidId(className.slice(prefix.length)) : undefined;
}

function getFlowchartNodes(root: HTMLElement) {
  return Array.from(root.querySelectorAll<SVGGElement>("g.node[id]"))
    .map((element) => ({ element, id: getNodeIdFromElement(element) }))
    .filter((node): node is { element: SVGGElement; id: string } => Boolean(node.id));
}

function getFlowchartEdges(root: HTMLElement): EdgeRecord[] {
  return Array.from(root.querySelectorAll<SVGElement>("g.edgePath, path[class*='LS-'], path[class*='LE-']"))
    .map((element) => {
      const parent = element.parentElement;

      return {
        element,
        source: getEndpointFromClassList(element, "LS-") ?? (parent ? getEndpointFromClassList(parent, "LS-") : undefined),
        target: getEndpointFromClassList(element, "LE-") ?? (parent ? getEndpointFromClassList(parent, "LE-") : undefined),
      };
    });
}

function getDragStyle(dragBox: DragBox) {
  const left = Math.min(dragBox.startX, dragBox.currentX);
  const top = Math.min(dragBox.startY, dragBox.currentY);
  const width = Math.abs(dragBox.currentX - dragBox.startX);
  const height = Math.abs(dragBox.currentY - dragBox.startY);

  return { left, top, width, height };
}

function intersects(a: DOMRect, b: DOMRect) {
  return a.left <= b.right && a.right >= b.left && a.top <= b.bottom && a.bottom >= b.top;
}

function extractSourceIds(segment: string) {
  const cleaned = segment.replace(/\[[^\]]*]/g, "").replace(/\([^)]*\)/g, "").replace(/\{[^}]*}/g, "");
  const matches = cleaned.match(/[A-Za-z][A-Za-z0-9_]*/g) ?? [];
  return matches.filter((id) => !["subgraph", "direction", "end", "linkStyle", "style", "classDef", "class"].includes(id));
}

function getSubgraphId(line: string, index: number) {
  const match = line.match(/^subgraph\s+([A-Za-z][A-Za-z0-9_]*)\b/);
  return match?.[1] ?? `Subgraph${index + 1}`;
}

function resolveSourceNodeId(graph: SourceGraph, id: string) {
  if (graph.nodeLines.has(id) || graph.nodeIds.includes(id)) {
    return id;
  }

  const normalized = normalizeMermaidId(id);
  if (graph.nodeLines.has(normalized) || graph.nodeIds.includes(normalized)) {
    return normalized;
  }

  return graph.nodeIds.find((nodeId) => normalized.endsWith(`-${nodeId}`) || normalized.endsWith(`_${nodeId}`)) ?? null;
}

function parseSourceGraph(source: string): SourceGraph {
  const initLines: string[] = [];
  let headerLine = "flowchart TD";
  const nodeLines = new Map<string, string>();
  const nodeIds = new Set<string>();
  const edges: SourceEdge[] = [];
  const subgraphs: SubgraphBlock[] = [];
  const subgraphStack: SubgraphBlock[] = [];
  const nodeSubgraph = new Map<string, string>();

  function registerNode(nodeId: string, line?: string) {
    nodeIds.add(nodeId);

    if (line && !nodeLines.has(nodeId)) {
      nodeLines.set(nodeId, line);
    }

    const currentSubgraph = subgraphStack.at(-1);
    if (!currentSubgraph || nodeSubgraph.has(nodeId)) {
      return;
    }

    nodeSubgraph.set(nodeId, currentSubgraph.id);
    currentSubgraph.nodeIds.push(nodeId);
  }

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("%%") && !line.startsWith("%%{init:")) {
      continue;
    }

    if (line.startsWith("%%{init:")) {
      initLines.push(line);
      continue;
    }

    if (/^(flowchart|graph)\b/.test(line)) {
      headerLine = line;
      continue;
    }

    if (/^subgraph\b/.test(line)) {
      subgraphStack.push({
        id: getSubgraphId(line, subgraphs.length + subgraphStack.length),
        headerLine: line,
        direction: null,
        nodeIds: [],
      });
      continue;
    }

    if (line === "end") {
      const subgraph = subgraphStack.pop();

      if (subgraph) {
        subgraphs.push(subgraph);
      }

      continue;
    }

    const currentSubgraph = subgraphStack.at(-1);
    if (currentSubgraph && /^direction\b/.test(line)) {
      currentSubgraph.direction = line;
      continue;
    }

    const nodeMatch = line.match(/^([A-Za-z][A-Za-z0-9_]*)\s*(?=[[\]({])/);
    if (nodeMatch) {
      registerNode(nodeMatch[1], line);
    }

    if (!/(-->|==>|-\.->)/.test(line)) {
      continue;
    }

    const arrow = line.includes("==>") ? "==>" : line.includes("-.->") ? "-.->" : "-->";
    const normalizedLine = line
      .replace(/==>/g, "-->")
      .replace(/-\.->/g, "-->")
      .replace(/--[^>-]+-->/g, "-->");
    const segments = normalizedLine.split("-->");

    for (let index = 0; index < segments.length - 1; index += 1) {
      const sourceIds = extractSourceIds(segments[index]);
      const targetIds = extractSourceIds(segments[index + 1]);
      const sourceId = sourceIds[sourceIds.length - 1];

      if (!sourceId) {
        continue;
      }

      registerNode(sourceId);

      for (const targetId of targetIds) {
        registerNode(targetId);
        edges.push({ source: sourceId, target: targetId, arrow });
      }
    }
  }

  while (subgraphStack.length > 0) {
    const subgraph = subgraphStack.pop();

    if (subgraph) {
      subgraphs.push(subgraph);
    }
  }

  return { initLines, headerLine, nodeIds: Array.from(nodeIds), nodeLines, edges, subgraphs, nodeSubgraph };
}

function expandNodeIdsByHops(graph: SourceGraph, seedIds: Set<string>, hops: number) {
  if (hops <= 0) {
    return new Set(seedIds);
  }

  const visible = new Set(seedIds);
  let frontier = new Set(seedIds);

  for (let hop = 0; hop < hops; hop += 1) {
    const nextFrontier = new Set<string>();

    for (const nodeId of frontier) {
      for (const edge of graph.edges) {
        if (edge.source === nodeId && !visible.has(edge.target)) {
          visible.add(edge.target);
          nextFrontier.add(edge.target);
        }

        if (edge.target === nodeId && !visible.has(edge.source)) {
          visible.add(edge.source);
          nextFrontier.add(edge.source);
        }
      }
    }

    frontier = nextFrontier;

    if (frontier.size === 0) {
      break;
    }
  }

  return visible;
}

function getVisibleNodeIds(graph: SourceGraph, filter: ViewFilter) {
  let visible = new Set(graph.nodeIds);

  if (filter.isolatedNodeIds && filter.isolatedNodeIds.length > 0) {
    const isolated = new Set(
      filter.isolatedNodeIds
        .map((nodeId) => resolveSourceNodeId(graph, nodeId))
        .filter((nodeId): nodeId is string => Boolean(nodeId))
    );

    visible = expandNodeIdsByHops(graph, isolated, filter.neighborHops);
  }

  return visible;
}

// Rebuilds flowchart source from visible nodes/edges only. Subgraph/linkStyle lines are
// omitted because linkStyle indices do not survive edge removal.
function createIsolatedMermaidSource(graph: SourceGraph, visibleNodeIds: Set<string>) {
  const lines = [...graph.initLines, graph.headerLine];
  const emittedNodeIds = new Set<string>();

  for (const subgraph of graph.subgraphs) {
    const visibleSubgraphNodeIds = subgraph.nodeIds.filter((nodeId) => visibleNodeIds.has(nodeId));

    if (visibleSubgraphNodeIds.length === 0) {
      continue;
    }

    lines.push(`    ${subgraph.headerLine}`);

    if (subgraph.direction) {
      lines.push(`        ${subgraph.direction}`);
    }

    for (const nodeId of visibleSubgraphNodeIds) {
      lines.push(`        ${graph.nodeLines.get(nodeId) ?? `${nodeId}[${nodeId}]`}`);
      emittedNodeIds.add(nodeId);
    }

    lines.push("    end");
  }

  for (const nodeId of graph.nodeIds) {
    if (!visibleNodeIds.has(nodeId) || emittedNodeIds.has(nodeId) || graph.nodeSubgraph.has(nodeId)) {
      continue;
    }

    lines.push(`    ${graph.nodeLines.get(nodeId) ?? `${nodeId}[${nodeId}]`}`);
  }

  const edgeKeys = new Set<string>();
  for (const edge of graph.edges) {
    if (!visibleNodeIds.has(edge.source) || !visibleNodeIds.has(edge.target)) {
      continue;
    }

    const key = `${edge.source}-${edge.arrow}-${edge.target}`;
    if (edgeKeys.has(key)) {
      continue;
    }

    edgeKeys.add(key);
    lines.push(`    ${edge.source} ${edge.arrow} ${edge.target}`);
  }

  return lines.join("\n");
}

function createFilteredSourceFromView(source: string, filter: ViewFilter) {
  if (!filter.isolatedNodeIds?.length) {
    return source;
  }

  const graph = parseSourceGraph(source);
  const visible = getVisibleNodeIds(graph, filter);

  return createIsolatedMermaidSource(graph, visible);
}

function hashSource(source: string) {
  let hash = 0;

  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 31 + source.charCodeAt(index)) >>> 0;
  }

  return hash.toString(36);
}

function ToolCluster({
  children,
  icon,
  isActive,
  label,
  onClick,
}: {
  children?: ReactNode;
  icon: ReactNode;
  isActive?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <div className="group/tool relative flex flex-col items-center">
      <button
        type="button"
        aria-label={label}
        title={label}
        onClick={onClick}
        className={cn(
          DIAGRAM_TOOLBAR_BTN,
          "relative z-20",
          isActive ? DIAGRAM_TOOLBAR_BTN_ACTIVE : DIAGRAM_TOOLBAR_BTN_IDLE
        )}
      >
        {icon}
      </button>
      {children && (
        <div className="absolute left-1/2 top-full z-10 flex w-12 -translate-x-1/2 -translate-y-3 justify-center pt-3 opacity-0 transition-all delay-150 duration-150 ease-out pointer-events-none group-hover/tool:translate-y-0 group-hover/tool:opacity-100 group-hover/tool:delay-0 group-hover/tool:pointer-events-auto">
          <div className="absolute inset-x-0 top-0 h-3" />
          <div className="flex flex-col gap-1">
          {children}
          </div>
        </div>
      )}
    </div>
  );
}

function MermaidSourceFloat({
  activeSource,
  isFullscreen,
  visible,
}: {
  activeSource: string;
  isFullscreen: boolean;
  visible: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const sourceRef = useRef<HTMLPreElement>(null);
  const lineCount = activeSource === "" ? 0 : activeSource.split("\n").length;
  const lineLabel = `${lineCount} ${lineCount === 1 ? "line" : "lines"}`;

  if (!visible) {
    return null;
  }

  async function handleCopy() {
    const didCopy = await copyText(activeSource, sourceRef.current);

    if (!didCopy) {
      return;
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), COPY_RESET_DELAY_MS);
  }

  if (!isOpen) {
    return (
      <div
        data-mermaid-ui
        className="pointer-events-auto absolute bottom-4 left-4 z-40"
        onPointerDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={cn(DIAGRAM_TOOLBAR_BTN, DIAGRAM_TOOLBAR_BTN_IDLE, "shadow-xl")}
          title={`Open isolated Mermaid source (${lineLabel})`}
          aria-label={`Open isolated Mermaid source, ${lineLabel}`}
        >
          <Code2 size={14} />
        </button>
      </div>
    );
  }

  return (
    <div
      data-mermaid-ui
      className={cn(
        "pointer-events-auto absolute bottom-4 left-4 z-40 flex w-[min(100%,28rem)] flex-col overflow-hidden rounded-lg border border-zinc-700 bg-black/90 shadow-xl backdrop-blur-sm",
        isFullscreen && "max-h-[40vh]"
      )}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <div className="flex items-center justify-between gap-2 border-b border-zinc-800 px-2 py-1">
        <div className="flex min-w-0 items-center gap-2">
          <p className="truncate font-mono text-[10px] font-medium uppercase tracking-wider text-zinc-400">
            Isolated Mermaid
          </p>
          <span className="shrink-0 font-mono text-[10px] text-zinc-600">{lineLabel}</span>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={handleCopy}
            className="rounded p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            title="Copy isolated Mermaid source"
            aria-label="Copy isolated Mermaid source"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            title="Collapse to icon"
            aria-label="Collapse isolated Mermaid source panel"
          >
            <PanelBottomClose size={14} />
          </button>
        </div>
      </div>
      <pre
        ref={sourceRef}
        className="max-h-48 overflow-auto px-3 py-1.5 pr-5 font-mono text-[11px] leading-relaxed text-zinc-300 sm:max-h-40"
      >
        {activeSource}
      </pre>
    </div>
  );
}

function HopLevelControl({
  hops,
  maxHops = MAX_NEIGHBOR_HOPS,
  onChange,
}: {
  hops: number;
  maxHops?: number;
  onChange: (hops: number) => void;
}) {
  const segmentClass =
    "inline-flex size-8 shrink-0 items-center justify-center bg-zinc-900/95 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div
      className={cn(
        "inline-flex h-8 overflow-hidden rounded border",
        hops > 0 ? "border-indigo-400" : "border-zinc-700"
      )}
      role="group"
      aria-label={`Neighbor hops: ${hops}`}
    >
      <button
        type="button"
        aria-label="Decrease neighbor hops"
        title="Decrease neighbor hops"
        disabled={hops <= 0}
        onClick={() => onChange(Math.max(0, hops - 1))}
        className={cn(segmentClass, "border-r border-zinc-700")}
      >
        <Minus size={14} />
      </button>
      <div
        className={cn(
          "flex min-w-9 items-center justify-center border-r border-zinc-700 px-1 font-mono text-[10px] uppercase tracking-wider",
          hops > 0 ? "bg-indigo-500/20 text-indigo-200" : "bg-zinc-900/95 text-zinc-400"
        )}
        aria-live="polite"
        title={`${hops} hop${hops === 1 ? "" : "s"} of neighbors`}
      >
        ±{hops}
      </div>
      <button
        type="button"
        aria-label="Increase neighbor hops"
        title="Increase neighbor hops"
        disabled={hops >= maxHops}
        onClick={() => onChange(Math.min(maxHops, hops + 1))}
        className={segmentClass}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

function SubToolButton({
  children,
  disabled,
  isActive,
  label,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  isActive?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        DIAGRAM_TOOLBAR_BTN,
        "shadow-lg",
        disabled && "cursor-not-allowed opacity-40 hover:bg-zinc-900/95 hover:text-zinc-400",
        isActive ? DIAGRAM_TOOLBAR_BTN_ACTIVE : DIAGRAM_TOOLBAR_BTN_IDLE
      )}
    >
      {children}
    </button>
  );
}

function MermaidViewer({
  activeSource,
  hasFilter,
  svg,
  isFullscreen,
  viewFilter,
  onViewFilterChange,
  onToggleFullscreen,
}: {
  activeSource: string;
  hasFilter: boolean;
  svg: string;
  isFullscreen: boolean;
  viewFilter: ViewFilter;
  onViewFilterChange: (filter: ViewFilter) => void;
  onToggleFullscreen: () => void;
}) {
  const diagramRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const fitViewRef = useRef<(() => void) | null>(null);
  const [toolMode, setToolMode] = useState<ToolMode>("select");
  const [dragBox, setDragBox] = useState<DragBox | null>(null);
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [middlePan, setMiddlePan] = useState<MiddlePan | null>(null);

  const isIsolateActive = Boolean(viewFilter.isolatedNodeIds?.length);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDragBox(null);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isFullscreen]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!hasFilter) {
        setSelectedNodeIds([]);
        setToolMode("select");
        return;
      }

      const root = diagramRef.current;

      if (!root) {
        setSelectedNodeIds([]);
        return;
      }

      const visibleIds = new Set(getFlowchartNodes(root).map((node) => node.id));
      setSelectedNodeIds((current) => current.filter((id) => visibleIds.has(id)));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [svg, hasFilter]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fitViewRef.current?.();
    }, 50);

    return () => window.clearTimeout(timer);
  }, [hasFilter, activeSource, svg]);

  useEffect(() => {
    const root = diagramRef.current;

    if (!root) {
      return;
    }

    const nodes = getFlowchartNodes(root);
    const selected = new Set(selectedNodeIds);

    for (const node of nodes) {
      node.element.style.display = "";
      node.element.style.cursor = "pointer";

      const shape = node.element.querySelector<SVGElement>("rect, polygon, circle, ellipse, path");
      if (shape) {
        shape.style.stroke = selected.has(node.id) ? "#fbbf24" : "";
        shape.style.strokeWidth = selected.has(node.id) ? "4px" : "";
        shape.style.filter = selected.has(node.id)
          ? "drop-shadow(0 0 10px rgba(251, 191, 36, 0.75))"
          : "";
      }
    }

    for (const edge of getFlowchartEdges(root)) {
      edge.element.style.display = "";
    }
  }, [selectedNodeIds, svg]);

  function getPointerPosition(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();

    return {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      width: bounds.width,
      height: bounds.height,
      bounds,
    };
  }

  function updateSelection(nodeIds: string[], options: { add: boolean; remove: boolean }) {
    const normalized = Array.from(new Set(nodeIds));

    setSelectedNodeIds((current) => {
      if (options.remove) {
        return current.filter((id) => !normalized.includes(id));
      }

      if (options.add) {
        return Array.from(new Set([...current, ...normalized]));
      }

      return normalized;
    });
  }

  function getNodeFromPoint(clientX: number, clientY: number) {
    const elements = document.elementsFromPoint(clientX, clientY);
    const nodeElement = elements
      .map((element) => getNodeElementFromTarget(element))
      .find(Boolean);

    return nodeElement ? getNodeIdFromElement(nodeElement) : null;
  }

  return (
    <div
      className={cn(
        "group/diagram relative rounded-lg border border-zinc-800 bg-zinc-950/80",
        isFullscreen
          ? "fixed inset-0 z-50 flex flex-col rounded-none border-0 bg-black p-4"
          : "min-h-[360px] overflow-hidden"
      )}
    >
      <TransformWrapper
        initialScale={1}
        minScale={0.02}
        maxScale={1000}
        centerOnInit
        limitToBounds={false}
        doubleClick={{ disabled: toolMode !== "zoom", mode: "zoomIn", step: 1.8 }}
        wheel={{ step: 0.18 }}
        pinch={{ step: 8 }}
        panning={{ disabled: true, velocityDisabled: false }}
      >
        {({ zoomIn, zoomOut, resetTransform, setTransform, state }) => {
          fitViewRef.current = () => {
            const viewport = viewportRef.current;
            const svgElement = diagramRef.current?.querySelector("svg");

            if (!viewport || !svgElement) {
              return;
            }

            resetTransform();

            window.requestAnimationFrame(() => {
              window.requestAnimationFrame(() => {
                const nextViewportRect = viewport.getBoundingClientRect();
                const nodes = getFlowchartNodes(diagramRef.current ?? viewport);
                const nodeRects = nodes
                  .map((node) => node.element.getBoundingClientRect())
                  .filter((rect) => rect.width > 0 && rect.height > 0);

                const contentRects = nodeRects.length > 0 ? nodeRects : [svgElement.getBoundingClientRect()];
                const left = Math.min(...contentRects.map((rect) => rect.left));
                const top = Math.min(...contentRects.map((rect) => rect.top));
                const right = Math.max(...contentRects.map((rect) => rect.right));
                const bottom = Math.max(...contentRects.map((rect) => rect.bottom));
                const contentWidth = right - left;
                const contentHeight = bottom - top;

                if (contentWidth <= 0 || contentHeight <= 0) {
                  return;
                }

                const padding = 32;
                const targetScale = Math.max(
                  0.02,
                  Math.min(
                    1000,
                    Math.min(
                      Math.max(1, nextViewportRect.width - padding) / contentWidth,
                      Math.max(1, nextViewportRect.height - padding) / contentHeight
                    )
                  )
                );
                const contentCenterX = left - nextViewportRect.left + contentWidth / 2;
                const contentCenterY = top - nextViewportRect.top + contentHeight / 2;
                const targetX = nextViewportRect.width / 2 - contentCenterX * targetScale;
                const targetY = nextViewportRect.height / 2 - contentCenterY * targetScale;

                setTransform(targetX, targetY, targetScale, 0);
              });
            });
          };

          const dragStyle = dragBox ? getDragStyle(dragBox) : null;
          const isDeselecting = toolMode === "select" && dragBox?.ctrlKey;
          const isAdding = toolMode === "select" && dragBox?.shiftKey;

          function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
            if ((event.target as Element).closest("[data-mermaid-ui]")) {
              return;
            }

            if (event.button === 1) {
              event.preventDefault();
              event.currentTarget.setPointerCapture(event.pointerId);
              setDragBox(null);
              setMiddlePan({
                startClientX: event.clientX,
                startClientY: event.clientY,
                startPositionX: state.positionX,
                startPositionY: state.positionY,
              });
              return;
            }

            if (event.button !== 0) {
              return;
            }

            event.preventDefault();
            event.currentTarget.setPointerCapture(event.pointerId);
            const point = getPointerPosition(event);
            setDragBox({
              startX: point.x,
              startY: point.y,
              currentX: point.x,
              currentY: point.y,
              shiftKey: event.shiftKey,
              ctrlKey: event.ctrlKey || event.metaKey,
            });
          }

          function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
            if (middlePan) {
              event.preventDefault();
              setTransform(
                middlePan.startPositionX + event.clientX - middlePan.startClientX,
                middlePan.startPositionY + event.clientY - middlePan.startClientY,
                state.scale,
                0
              );
              return;
            }

            if (!dragBox) {
              return;
            }

            event.preventDefault();
            const point = getPointerPosition(event);
            setDragBox((current) =>
              current
                ? {
                    ...current,
                    currentX: Math.max(0, Math.min(point.x, point.width)),
                    currentY: Math.max(0, Math.min(point.y, point.height)),
                    shiftKey: event.shiftKey,
                    ctrlKey: event.ctrlKey || event.metaKey,
                  }
                : current
            );
          }

          function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
            if (middlePan) {
              event.preventDefault();
              setMiddlePan(null);
              return;
            }

            if (!dragBox) {
              return;
            }

            event.preventDefault();
            const point = getPointerPosition(event);
            const finalDragBox = {
              ...dragBox,
              currentX: Math.max(0, Math.min(point.x, point.width)),
              currentY: Math.max(0, Math.min(point.y, point.height)),
              shiftKey: event.shiftKey || dragBox.shiftKey,
              ctrlKey: event.ctrlKey || event.metaKey || dragBox.ctrlKey,
            };
            const rect = getDragStyle(finalDragBox);
            const isClick = rect.width < 8 && rect.height < 8;

            setDragBox(null);

            if (toolMode === "select") {
              if (isClick) {
                const nodeId = getNodeFromPoint(event.clientX, event.clientY);
                updateSelection(nodeId ? [nodeId] : [], {
                  add: finalDragBox.shiftKey,
                  remove: finalDragBox.ctrlKey,
                });
                return;
              }

              const selectionRect = new DOMRect(
                point.bounds.left + rect.left,
                point.bounds.top + rect.top,
                rect.width,
                rect.height
              );
              const nodeIds =
                diagramRef.current
                  ? getFlowchartNodes(diagramRef.current)
                      .filter((node) => intersects(node.element.getBoundingClientRect(), selectionRect))
                      .map((node) => node.id)
                  : [];

              updateSelection(nodeIds, {
                add: finalDragBox.shiftKey,
                remove: finalDragBox.ctrlKey,
              });
              return;
            }

            if (toolMode === "zoom" && !isClick) {
              const sourceScale = state.scale || 1;
              const contentLeft = (rect.left - state.positionX) / sourceScale;
              const contentTop = (rect.top - state.positionY) / sourceScale;
              const contentWidth = rect.width / sourceScale;
              const contentHeight = rect.height / sourceScale;
              const contentCenterX = contentLeft + contentWidth / 2;
              const contentCenterY = contentTop + contentHeight / 2;
              const targetScale = Math.max(
                0.02,
                Math.min(1000, Math.min(point.width / contentWidth, point.height / contentHeight) * 0.9)
              );
              const targetX = point.width / 2 - contentCenterX * targetScale;
              const targetY = point.height / 2 - contentCenterY * targetScale;

              setTransform(targetX, targetY, targetScale, 240);
            }
          }

          return (
            <>
              <div className="absolute right-4 top-4 z-30 flex items-center gap-1.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover/diagram:opacity-100">
                <ToolCluster
                  icon={<MousePointer2 size={14} />}
                  isActive={toolMode === "select"}
                  label="Select"
                  onClick={() => setToolMode("select")}
                >
                  <SubToolButton
                    label="Isolate selection - cut flow to selected nodes and their links, then re-render"
                    disabled={selectedNodeIds.length === 0}
                    isActive={isIsolateActive}
                    onClick={() => {
                      if (selectedNodeIds.length === 0) {
                        return;
                      }

                      onViewFilterChange({
                        isolatedNodeIds: selectedNodeIds,
                        neighborHops: 0,
                      });
                      setSelectedNodeIds([]);
                    }}
                  >
                    <Split size={14} />
                  </SubToolButton>
                </ToolCluster>
                {hasFilter && (
                  <HopLevelControl
                    hops={viewFilter.neighborHops}
                    onChange={(neighborHops) => {
                      onViewFilterChange({
                        ...viewFilter,
                        neighborHops,
                      });
                    }}
                  />
                )}
                <ToolCluster
                  icon={<ScanSearch size={14} />}
                  isActive={toolMode === "zoom"}
                  label="Zoom"
                  onClick={() => setToolMode("zoom")}
                >
                  <SubToolButton label="Zoom in" onClick={() => zoomIn(1.8)}>
                    <ZoomIn size={14} />
                  </SubToolButton>
                  <SubToolButton label="Zoom out" onClick={() => zoomOut(1.8)}>
                    <ZoomOut size={14} />
                  </SubToolButton>
                </ToolCluster>
                <ToolCluster
                  icon={<RotateCcw size={14} />}
                  label="Reset"
                  onClick={() => {
                    fitViewRef.current?.();
                  }}
                >
                  <SubToolButton
                    label="Fit to view"
                    onClick={() => {
                      fitViewRef.current?.();
                    }}
                  >
                    <RotateCcw size={14} />
                  </SubToolButton>
                  <SubToolButton
                    label="Show all nodes - restore full flowchart"
                    onClick={() => {
                      onViewFilterChange(DEFAULT_VIEW_FILTER);
                      setSelectedNodeIds([]);
                    }}
                  >
                    <Undo2 size={14} />
                  </SubToolButton>
                </ToolCluster>
                <button
                  type="button"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                  title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                  onClick={onToggleFullscreen}
                  className={cn(DIAGRAM_TOOLBAR_BTN, DIAGRAM_TOOLBAR_BTN_IDLE)}
                >
                  {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
              </div>
              <div
                ref={viewportRef}
                className={cn(
                  "relative w-full overflow-hidden",
                  toolMode === "select" && "cursor-crosshair",
                  toolMode === "zoom" && "cursor-zoom-in",
                  middlePan && "cursor-grabbing",
                  isFullscreen ? "flex-1" : "min-h-[360px]"
                )}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={() => {
                  setDragBox(null);
                  setMiddlePan(null);
                }}
                onAuxClick={(event) => event.preventDefault()}
              >
                <TransformComponent
                  wrapperStyle={{
                    width: "100%",
                    height: isFullscreen ? "100%" : "360px",
                    minHeight: isFullscreen ? "100%" : "360px",
                  }}
                  contentStyle={{
                    width: "100%",
                    minHeight: isFullscreen ? "100%" : "360px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    ref={diagramRef}
                    className="mermaid-diagram max-w-none p-4 [&_svg]:h-auto [&_svg]:max-w-none"
                    dangerouslySetInnerHTML={{ __html: svg }}
                  />
                </TransformComponent>
                {toolMode === "select" && (
                  <div className="pointer-events-none absolute left-4 top-4 z-20 rounded border border-zinc-700 bg-black/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                    {dragBox?.ctrlKey ? "- deselect" : dragBox?.shiftKey ? "+ add select" : selectedNodeIds.length > 0 ? "+ replace select" : "+ select"}
                  </div>
                )}
                {dragStyle && (
                  <div
                    className={cn(
                      "pointer-events-none absolute z-20 border shadow-[0_0_0_9999px_rgba(0,0,0,0.18)]",
                      toolMode === "select" && (isDeselecting
                        ? "border-red-300 bg-red-400/15"
                        : isAdding
                          ? "border-emerald-300 bg-emerald-400/15"
                          : "border-amber-300 bg-amber-400/15"),
                      toolMode === "zoom" && "border-indigo-300 bg-indigo-400/15"
                    )}
                    style={dragStyle}
                  />
                )}
              </div>
              <MermaidSourceFloat
                activeSource={activeSource}
                isFullscreen={isFullscreen}
                visible={hasFilter}
              />
            </>
          );
        }}
      </TransformWrapper>
      <div className="mt-2 text-center font-mono text-[10px] uppercase tracking-widest text-zinc-600 opacity-100 transition-opacity sm:opacity-0 sm:group-hover/diagram:opacity-100">
        Select nodes, isolate crops the source, +/- hop control expands neighbors - wheel zooms, middle mouse pans
      </div>
    </div>
  );
}

export function MermaidBlock({ content }: { content: string }) {
  const reactId = useId();
  const diagramSource = useMemo(() => content.trim(), [content]);
  const [viewFilter, setViewFilter] = useState<ViewFilter>(DEFAULT_VIEW_FILTER);
  const activeSource = useMemo(
    () => createFilteredSourceFromView(diagramSource, viewFilter),
    [diagramSource, viewFilter]
  );
  const hasFilter = activeSource !== diagramSource;
  const activeSourceHash = useMemo(() => hashSource(activeSource), [activeSource]);
  const renderId = useMemo(
    () => `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}-${activeSourceHash}`,
    [activeSourceHash, reactId]
  );
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setViewFilter(DEFAULT_VIEW_FILTER);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [diagramSource]);

  useEffect(() => {
    if (!isFullscreen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsFullscreen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);

  useEffect(() => {
    let isMounted = true;

    async function renderMermaid() {
      try {
        await mermaid.parse(activeSource);
        const { svg: renderedSvg } = await mermaid.render(renderId, activeSource);
        if (isMounted) {
          setSvg(renderedSvg);
          setError(false);
        }
      } catch (err) {
        console.error("Failed to render Mermaid diagram:", err);
        if (isMounted) {
          setError(true);
        }
      }
    }

    if (activeSource) {
      renderMermaid();
    }

    return () => {
      isMounted = false;
    };
  }, [activeSource, renderId]);

  return (
    <div className="group relative my-8 rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 transition-all hover:border-zinc-700/50">
      {error ? (
        <div className="flex h-40 items-center justify-center rounded-lg border border-red-900/20 bg-red-950/10 font-mono text-sm text-red-400">
          Failed to render flowchart
        </div>
      ) : svg ? (
        <MermaidViewer
          activeSource={activeSource}
          hasFilter={hasFilter}
          svg={svg}
          isFullscreen={isFullscreen}
          viewFilter={viewFilter}
          onViewFilterChange={setViewFilter}
          onToggleFullscreen={() => setIsFullscreen((current) => !current)}
        />
      ) : (
        <div className="flex h-40 animate-pulse items-center justify-center font-mono text-sm text-zinc-500">
          Loading flowchart...
        </div>
      )}
    </div>
  );
}
