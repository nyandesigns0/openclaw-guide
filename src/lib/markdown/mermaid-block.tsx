"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import mermaid from "mermaid";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Code2,
  Copy,
  PanelBottomClose,
  Maximize2,
  Minimize2,
  MousePointer2,
  Hand,
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
import { setMermaidFullscreen } from "@/lib/mermaid-fullscreen";
import { copyText } from "./copy";
import {
  getGestureHint,
  useCoarsePointer,
  useMermaidGestures,
  ZOOM_ANIMATION_MS,
  ZOOM_STEP_FACTOR,
  type SelectionMode,
  type ToolMode,
  type TransformSnapshot,
} from "./mermaid-gestures";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "inherit",
});

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
  label: string;
  direction: string | null;
  nodeIds: string[];
};
type SourceGraph = {
  initLines: string[];
  headerLine: string;
  styleLines: string[];
  nodeIds: string[];
  nodeLines: Map<string, string>;
  edges: SourceEdge[];
  subgraphs: SubgraphBlock[];
  nodeSubgraph: Map<string, string>;
};
type ViewFilter = {
  isolatedNodeIds: string[] | null;
  /** Predecessors (upstream / top in TD flowcharts). */
  neighborHopsUp: number;
  /** Successors (downstream / bottom in TD flowcharts). */
  neighborHopsDown: number;
};

const DEFAULT_VIEW_FILTER: ViewFilter = {
  isolatedNodeIds: null,
  neighborHopsUp: 0,
  neighborHopsDown: 0,
};

const COPY_RESET_DELAY_MS = 2000;
const MAX_NEIGHBOR_HOPS = 8;
const ORIGIN_NODE_ID = "A0";

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

function closestElement<T extends Element>(element: Element, selector: string) {
  let current: Element | null = element;

  while (current) {
    if (current.matches(selector)) {
      return current as T;
    }

    current = current.parentNode instanceof Element ? current.parentNode : null;
  }

  return null;
}

function getNodeElementFromTarget(target: Element) {
  const nodeElement = closestElement<SVGGElement>(target, "g.node[id]");
  if (nodeElement) {
    return nodeElement;
  }

  const labelElement = closestElement<SVGGElement>(target, "g.nodeLabel, g.label");
  return labelElement ? closestElement<SVGGElement>(labelElement, "g.node[id]") : null;
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

function getEdgeStrokeElements(edgeElement: SVGElement) {
  if (edgeElement.tagName === "path") {
    return [edgeElement];
  }

  return Array.from(edgeElement.querySelectorAll<SVGElement>("path"));
}

function isEdgeConnectedToSelection(edge: EdgeRecord, selectedNodeIds: Set<string>) {
  if (selectedNodeIds.size === 0 || !edge.source || !edge.target) {
    return false;
  }

  return selectedNodeIds.has(edge.source) || selectedNodeIds.has(edge.target);
}

function applyEdgeSelectionStyle(edge: EdgeRecord, highlighted: boolean) {
  for (const path of getEdgeStrokeElements(edge.element)) {
    if (highlighted) {
      path.style.stroke = "#fbbf24";
      path.style.strokeWidth = "3px";
      path.style.filter = "drop-shadow(0 0 6px rgba(251, 191, 36, 0.65))";
      continue;
    }

    path.style.stroke = "";
    path.style.strokeWidth = "";
    path.style.filter = "";
  }
}

function intersects(a: DOMRect, b: DOMRect) {
  return a.left <= b.right && a.right >= b.left && a.top <= b.bottom && a.bottom >= b.top;
}

function getSelectedNodeScreenBounds(diagramRoot: HTMLElement, selectedNodeIds: string[]) {
  const selected = new Set(selectedNodeIds);
  const rects = getFlowchartNodes(diagramRoot)
    .filter((node) => selected.has(node.id))
    .map((node) => node.element.getBoundingClientRect())
    .filter((rect) => rect.width > 0 && rect.height > 0);

  if (rects.length === 0) {
    return null;
  }

  const left = Math.min(...rects.map((rect) => rect.left));
  const top = Math.min(...rects.map((rect) => rect.top));
  const right = Math.max(...rects.map((rect) => rect.right));
  const bottom = Math.max(...rects.map((rect) => rect.bottom));

  return new DOMRect(left, top, right - left, bottom - top);
}

function getContentCenterFromScreenBounds(
  viewportRect: DOMRect,
  positionX: number,
  positionY: number,
  scale: number,
  screenBounds: DOMRect
) {
  const screenCenterX = screenBounds.left + screenBounds.width / 2;
  const screenCenterY = screenBounds.top + screenBounds.height / 2;

  return {
    x: (screenCenterX - viewportRect.left - positionX) / scale,
    y: (screenCenterY - viewportRect.top - positionY) / scale,
  };
}

function getCenteredTransform(
  viewportWidth: number,
  viewportHeight: number,
  contentCenterX: number,
  contentCenterY: number,
  scale: number
) {
  return {
    x: viewportWidth / 2 - contentCenterX * scale,
    y: viewportHeight / 2 - contentCenterY * scale,
    scale,
  };
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

function getSubgraphLabel(headerLine: string, id: string) {
  const quotedMatch = headerLine.match(/\["([^"]+)"\]/);
  if (quotedMatch) {
    return quotedMatch[1];
  }

  const bracketMatch = headerLine.match(/\[(?!["'])([^\]]+)\]/);
  if (bracketMatch) {
    return bracketMatch[1].trim();
  }

  return id;
}

function escapeMermaidLabel(label: string) {
  return label.replace(/"/g, "#quot;");
}

function isDatabaseNodeLine(line: string) {
  return /\[\(\s*"/.test(line) || /\[\(\s*[^)]+\)\]/.test(line);
}

function isSubgraphId(graph: SourceGraph, id: string) {
  return graph.subgraphs.some((subgraph) => subgraph.id === id);
}

function resolveCollapsedEndpoint(
  graph: SourceGraph,
  nodeId: string,
  collapsedSubgraphIds: Set<string>
) {
  if (isSubgraphId(graph, nodeId)) {
    return collapsedSubgraphIds.has(nodeId) ? nodeId : nodeId;
  }

  const subgraphId = graph.nodeSubgraph.get(nodeId);
  if (subgraphId && collapsedSubgraphIds.has(subgraphId)) {
    return subgraphId;
  }

  return nodeId;
}

function isEndpointVisible(
  graph: SourceGraph,
  endpointId: string,
  expandedSubgraphIds: Set<string>,
  visibleNodeIds: Set<string> | null
) {
  if (!visibleNodeIds) {
    return true;
  }

  if (isSubgraphId(graph, endpointId)) {
    if (expandedSubgraphIds.has(endpointId)) {
      const subgraph = graph.subgraphs.find((item) => item.id === endpointId);
      return subgraph ? subgraph.nodeIds.some((nodeId) => visibleNodeIds.has(nodeId)) : false;
    }

    const subgraph = graph.subgraphs.find((item) => item.id === endpointId);
    return subgraph ? subgraph.nodeIds.some((nodeId) => visibleNodeIds.has(nodeId)) : visibleNodeIds.has(endpointId);
  }

  if (visibleNodeIds.has(endpointId)) {
    return true;
  }

  const subgraphId = graph.nodeSubgraph.get(endpointId);
  if (!subgraphId) {
    return false;
  }

  if (expandedSubgraphIds.has(subgraphId)) {
    return visibleNodeIds.has(endpointId);
  }

  return graph.subgraphs
    .find((item) => item.id === subgraphId)
    ?.nodeIds.some((nodeId) => visibleNodeIds.has(nodeId)) ?? false;
}

function getSubgraphIdFromNodeElement(nodeElement: SVGGElement, subgraphs: SubgraphBlock[]) {
  const nodeId = getNodeIdFromElement(nodeElement);

  if (nodeId && subgraphs.some((subgraph) => subgraph.id === nodeId)) {
    return nodeId;
  }

  const labelText = getSvgText(nodeElement);

  if (!labelText) {
    return null;
  }

  return subgraphs.find((subgraph) => subgraph.label === labelText)?.id ?? null;
}

function getSvgText(element: Element) {
  return element.textContent?.replace(/\s+/g, " ").trim() ?? "";
}

function getClusterLabelElement(cluster: Element) {
  return cluster.querySelector<Element>(".cluster-label, .label");
}

function extractSubgraphIdFromCluster(cluster: Element, subgraphs: SubgraphBlock[]) {
  const clusterId = cluster.getAttribute("id") ?? "";

  for (const subgraph of subgraphs) {
    if (clusterId.includes(subgraph.id)) {
      return subgraph.id;
    }
  }

  const labelElement = getClusterLabelElement(cluster);
  const labelText = labelElement ? getSvgText(labelElement) : getSvgText(cluster);

  if (!labelText) {
    return null;
  }

  return subgraphs.find((subgraph) => subgraph.label === labelText)?.id ?? null;
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
  const styleLines: string[] = [];
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

    if (/^(style|classDef|class)\b/.test(line)) {
      styleLines.push(line);
      continue;
    }

    if (/^subgraph\b/.test(line)) {
      const id = getSubgraphId(line, subgraphs.length + subgraphStack.length);
      subgraphStack.push({
        id,
        headerLine: line,
        label: getSubgraphLabel(line, id),
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

  return { initLines, headerLine, styleLines, nodeIds: Array.from(nodeIds), nodeLines, edges, subgraphs, nodeSubgraph };
}

function clampNeighborHops(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(MAX_NEIGHBOR_HOPS, Math.max(0, Math.round(value)));
}

function expandNodeIdsByDirectedHops(
  graph: SourceGraph,
  seedIds: Set<string>,
  hopsUp: number,
  hopsDown: number
) {
  const visible = new Set(seedIds);

  if (hopsUp > 0) {
    let frontier = new Set(seedIds);

    for (let hop = 0; hop < hopsUp; hop += 1) {
      const nextFrontier = new Set<string>();

      for (const nodeId of frontier) {
        for (const edge of graph.edges) {
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
  }

  if (hopsDown > 0) {
    let frontier = new Set(seedIds);

    for (let hop = 0; hop < hopsDown; hop += 1) {
      const nextFrontier = new Set<string>();

      for (const nodeId of frontier) {
        for (const edge of graph.edges) {
          if (edge.source === nodeId && !visible.has(edge.target)) {
            visible.add(edge.target);
            nextFrontier.add(edge.target);
          }
        }
      }

      frontier = nextFrontier;

      if (frontier.size === 0) {
        break;
      }
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

    visible = expandNodeIdsByDirectedHops(
      graph,
      isolated,
      filter.neighborHopsUp,
      filter.neighborHopsDown
    );
  }

  return visible;
}

// Rebuilds flowchart source with optional subgraph collapse and node isolation.
function createDisplayMermaidSource(
  graph: SourceGraph,
  expandedSubgraphIds: Set<string>,
  visibleNodeIds: Set<string> | null
) {
  const collapsedSubgraphIds = new Set(
    graph.subgraphs.map((subgraph) => subgraph.id).filter((id) => !expandedSubgraphIds.has(id))
  );
  const lines = [...graph.initLines, graph.headerLine];
  const emittedNodeIds = new Set<string>();
  const databaseNodeIds = new Set<string>();
  const groupNodeIds = new Set<string>();

  lines.push("    classDef dbNode fill:#0c4a6e,stroke:#38bdf8,stroke-width:2px,color:#e0f2fe");
  lines.push("    classDef groupNode fill:#312e81,stroke:#a78bfa,stroke-width:2px,color:#ede9fe");

  function emitNodeLine(nodeId: string, indent: string) {
    const nodeLine = graph.nodeLines.get(nodeId) ?? `${nodeId}[${nodeId}]`;
    lines.push(`${indent}${nodeLine}`);
    emittedNodeIds.add(nodeId);

    if (isDatabaseNodeLine(nodeLine)) {
      databaseNodeIds.add(nodeId);
    }
  }

  for (const subgraph of graph.subgraphs) {
    if (expandedSubgraphIds.has(subgraph.id)) {
      const visibleSubgraphNodeIds = visibleNodeIds
        ? subgraph.nodeIds.filter((nodeId) => visibleNodeIds.has(nodeId))
        : subgraph.nodeIds;

      if (visibleSubgraphNodeIds.length === 0) {
        continue;
      }

      lines.push(`    ${subgraph.headerLine}`);

      if (subgraph.direction) {
        lines.push(`        ${subgraph.direction}`);
      }

      for (const nodeId of visibleSubgraphNodeIds) {
        emitNodeLine(nodeId, "        ");
      }

      lines.push("    end");
      continue;
    }

    const hasVisibleMembers = visibleNodeIds
      ? subgraph.nodeIds.some((nodeId) => visibleNodeIds.has(nodeId))
      : subgraph.nodeIds.length > 0;

    if (!hasVisibleMembers) {
      continue;
    }

    lines.push(`    ${subgraph.id}{{"${escapeMermaidLabel(subgraph.label)}"}}`);
    emittedNodeIds.add(subgraph.id);
    groupNodeIds.add(subgraph.id);
  }

  for (const nodeId of graph.nodeIds) {
    if (emittedNodeIds.has(nodeId) || graph.nodeSubgraph.has(nodeId)) {
      continue;
    }

    if (visibleNodeIds && !visibleNodeIds.has(nodeId) && !isSubgraphId(graph, nodeId)) {
      continue;
    }

    if (isSubgraphId(graph, nodeId) && !expandedSubgraphIds.has(nodeId)) {
      continue;
    }

    emitNodeLine(nodeId, "    ");
  }

  const edgeKeys = new Set<string>();
  for (const edge of graph.edges) {
    const sourceExpandedSubgraph = isSubgraphId(graph, edge.source) && expandedSubgraphIds.has(edge.source);
    const targetExpandedSubgraph = isSubgraphId(graph, edge.target) && expandedSubgraphIds.has(edge.target);

    const source = sourceExpandedSubgraph
      ? edge.source
      : resolveCollapsedEndpoint(graph, edge.source, collapsedSubgraphIds);
    const target = targetExpandedSubgraph
      ? edge.target
      : resolveCollapsedEndpoint(graph, edge.target, collapsedSubgraphIds);

    if (source === target) {
      continue;
    }

    if (
      visibleNodeIds &&
      (!isEndpointVisible(graph, source, expandedSubgraphIds, visibleNodeIds) ||
        !isEndpointVisible(graph, target, expandedSubgraphIds, visibleNodeIds))
    ) {
      continue;
    }

    const key = `${source}-${edge.arrow}-${target}`;
    if (edgeKeys.has(key)) {
      continue;
    }

    edgeKeys.add(key);
    lines.push(`    ${source} ${edge.arrow} ${target}`);
  }

  if (databaseNodeIds.size > 0) {
    lines.push(`    class ${Array.from(databaseNodeIds).join(",")} dbNode`);
  }

  if (groupNodeIds.size > 0) {
    lines.push(`    class ${Array.from(groupNodeIds).join(",")} groupNode`);
  }

  lines.push(...graph.styleLines.map((line) => `    ${line}`));

  return lines.join("\n");
}

function createFilteredSourceFromView(
  source: string,
  viewFilter: ViewFilter,
  expandedSubgraphIds: Set<string>
) {
  const graph = parseSourceGraph(source);
  const hasSubgraphs = graph.subgraphs.length > 0;
  const hasIsolation = Boolean(viewFilter.isolatedNodeIds?.length);
  const allExpanded = !hasSubgraphs || graph.subgraphs.every((subgraph) => expandedSubgraphIds.has(subgraph.id));

  if (!hasSubgraphs && !hasIsolation) {
    return source;
  }

  if (allExpanded && !hasIsolation) {
    return source;
  }

  const visibleNodeIds = hasIsolation ? getVisibleNodeIds(graph, viewFilter) : null;

  return createDisplayMermaidSource(graph, expandedSubgraphIds, visibleNodeIds);
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
  isCoarsePointer,
  label,
  onClick,
}: {
  children?: ReactNode;
  icon: ReactNode;
  isActive?: boolean;
  isCoarsePointer?: boolean;
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
      {children && !isCoarsePointer && (
        <div className="absolute left-1/2 top-full z-10 flex w-12 -translate-x-1/2 -translate-y-3 justify-center pt-3 opacity-0 transition-all delay-150 duration-150 ease-out pointer-events-none group-hover/tool:translate-y-0 group-hover/tool:opacity-100 group-hover/tool:delay-0 group-hover/tool:pointer-events-auto">
          <div className="absolute inset-x-0 top-0 h-3" />
          <div className="flex flex-col gap-1">{children}</div>
        </div>
      )}
    </div>
  );
}

function SelectionModeToggle({
  mode,
  onChange,
}: {
  mode: SelectionMode;
  onChange: (mode: SelectionMode) => void;
}) {
  const options: { value: SelectionMode; label: string }[] = [
    { value: "replace", label: "Replace" },
    { value: "add", label: "Add" },
    { value: "remove", label: "Remove" },
  ];

  return (
    <div
      className="pointer-events-auto absolute left-4 top-14 z-20 flex overflow-hidden rounded border border-zinc-700 bg-black/80 font-mono text-[10px] uppercase tracking-wider"
      data-mermaid-ui
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "px-2 py-1 transition-colors",
            mode === option.value
              ? "bg-indigo-500/25 text-indigo-200"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          )}
        >
          {option.label}
        </button>
      ))}
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

function HopDirectionRow({
  direction,
  hops,
  maxHops = MAX_NEIGHBOR_HOPS,
  onChange,
}: {
  direction: "up" | "down";
  hops: number;
  maxHops?: number;
  onChange: (hops: number) => void;
}) {
  const [draft, setDraft] = useState(String(hops));
  const isUp = direction === "up";
  const directionLabel = isUp ? "upstream (top)" : "downstream (bottom)";

  useEffect(() => {
    setDraft(String(hops));
  }, [hops]);

  const segmentClass =
    "inline-flex size-7 shrink-0 items-center justify-center bg-zinc-900/95 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-40";

  const commitDraft = () => {
    const parsed = Number.parseInt(draft, 10);

    if (Number.isNaN(parsed)) {
      setDraft(String(hops));
      return;
    }

    onChange(clampNeighborHops(parsed));
  };

  return (
    <div
      className={cn(
        "inline-flex h-7 overflow-hidden rounded border",
        hops > 0 ? "border-indigo-400" : "border-zinc-700"
      )}
      role="group"
      aria-label={`${directionLabel} neighbor hops: ${hops}`}
    >
      <div
        className={cn(
          "inline-flex w-6 shrink-0 items-center justify-center border-r border-zinc-700",
          hops > 0 ? "bg-indigo-500/20 text-indigo-200" : "bg-zinc-900/95 text-zinc-500"
        )}
        title={directionLabel}
        aria-hidden
      >
        {isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
      </div>
      <button
        type="button"
        aria-label={`Decrease ${directionLabel} hops`}
        title={`Decrease ${directionLabel} hops`}
        disabled={hops <= 0}
        onClick={() => onChange(Math.max(0, hops - 1))}
        className={cn(segmentClass, "border-r border-zinc-700")}
      >
        <Minus size={12} />
      </button>
      <input
        type="number"
        min={0}
        max={maxHops}
        inputMode="numeric"
        aria-label={`${directionLabel} hop count`}
        title={`${directionLabel} hops (0-${maxHops})`}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commitDraft}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          }

          if (event.key === "Escape") {
            setDraft(String(hops));
            event.currentTarget.blur();
          }
        }}
        className={cn(
          "h-7 w-9 shrink-0 border-r border-zinc-700 bg-zinc-900/95 px-0 text-center font-mono text-[11px] tabular-nums text-zinc-200 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          hops > 0 && "bg-indigo-500/20 text-indigo-100"
        )}
      />
      <button
        type="button"
        aria-label={`Increase ${directionLabel} hops`}
        title={`Increase ${directionLabel} hops`}
        disabled={hops >= maxHops}
        onClick={() => onChange(Math.min(maxHops, hops + 1))}
        className={segmentClass}
      >
        <Plus size={12} />
      </button>
    </div>
  );
}

function DirectedHopControls({
  hopsUp,
  hopsDown,
  onChangeUp,
  onChangeDown,
}: {
  hopsUp: number;
  hopsDown: number;
  onChangeUp: (hops: number) => void;
  onChangeDown: (hops: number) => void;
}) {
  const isActive = hopsUp > 0 || hopsDown > 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded border p-1 shadow-lg",
        isActive ? "border-indigo-400/80 bg-zinc-950/90" : "border-zinc-700 bg-zinc-950/90"
      )}
      role="group"
      aria-label={`Neighbor hops: ${hopsUp} up, ${hopsDown} down`}
    >
      <HopDirectionRow direction="up" hops={hopsUp} onChange={onChangeUp} />
      <HopDirectionRow direction="down" hops={hopsDown} onChange={onChangeDown} />
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
  collapsedSubgraphIds,
  graphSubgraphs,
  hasFilter,
  hasSubgraphCollapse,
  svg,
  isFullscreen,
  viewFilter,
  onToggleSubgraph,
  onResetView,
  onViewFilterChange,
  onToggleFullscreen,
}: {
  activeSource: string;
  collapsedSubgraphIds: Set<string>;
  graphSubgraphs: SubgraphBlock[];
  hasFilter: boolean;
  hasSubgraphCollapse: boolean;
  svg: string;
  isFullscreen: boolean;
  viewFilter: ViewFilter;
  onToggleSubgraph: (subgraphId: string) => void;
  onResetView: () => void;
  onViewFilterChange: (filter: ViewFilter) => void;
  onToggleFullscreen: () => void;
}) {
  const diagramRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const fitViewRef = useRef<(() => void) | null>(null);
  const zoomAroundSelectionRef = useRef<(direction: "in" | "out") => void>(() => {});
  const lastGroupToggleRef = useRef({ subgraphId: "", time: 0 });
  const lastGroupClickRef = useRef({ subgraphId: "", time: 0 });
  const transformRef = useRef<TransformSnapshot>({ positionX: 0, positionY: 0, scale: 1 });
  const setTransformRef = useRef<
    ((x: number, y: number, scale: number, animationTime?: number) => void) | null
  >(null);
  const isCoarsePointer = useCoarsePointer();
  const hasSetDefaultToolRef = useRef(false);
  const [toolMode, setToolMode] = useState<ToolMode>("select");
  const [selectionMode, setSelectionMode] = useState<SelectionMode>("replace");
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);

  const isIsolateActive = Boolean(viewFilter.isolatedNodeIds?.length);
  const focusZoomOnSelection = toolMode === "select" && selectedNodeIds.length > 0;

  useEffect(() => {
    if (!hasSetDefaultToolRef.current && isCoarsePointer) {
      setToolMode("pan");
      hasSetDefaultToolRef.current = true;
    }
  }, [isCoarsePointer]);

  const syncTransformRef = useCallback((positionX: number, positionY: number, scale: number) => {
    transformRef.current = {
      positionX,
      positionY,
      scale: scale || 1,
    };
  }, []);

  function toggleSubgraphOnce(subgraphId: string) {
    const now = window.performance.now();
    const lastToggle = lastGroupToggleRef.current;

    if (lastToggle.subgraphId === subgraphId && now - lastToggle.time < 250) {
      return;
    }

    lastGroupToggleRef.current = { subgraphId, time: now };
    onToggleSubgraph(subgraphId);
  }

  function getToggleSubgraphIdFromTarget(target: Element) {
    const nodeElement = getNodeElementFromTarget(target);
    if (nodeElement) {
      const subgraphId = getSubgraphIdFromNodeElement(nodeElement, graphSubgraphs);

      if (subgraphId && collapsedSubgraphIds.has(subgraphId)) {
        return subgraphId;
      }
    }

    const targetText = getSvgText(target);
    const labelMatch = graphSubgraphs.find((subgraph) => subgraph.label === targetText);
    if (labelMatch && !collapsedSubgraphIds.has(labelMatch.id)) {
      return labelMatch.id;
    }

    const cluster = closestElement<SVGGElement>(target, "g.cluster");
    const clusterLabel = closestElement<Element>(target, ".cluster-label, .label");
    const clusterTitle = cluster ? getClusterLabelElement(cluster) : null;
    if (
      !cluster ||
      !clusterLabel ||
      !clusterTitle ||
      (clusterLabel !== clusterTitle && !clusterTitle.contains(clusterLabel))
    ) {
      return null;
    }

    const subgraphId = extractSubgraphIdFromCluster(cluster, graphSubgraphs);
    return subgraphId && !collapsedSubgraphIds.has(subgraphId) ? subgraphId : null;
  }

  function getToggleSubgraphIdFromPoint(clientX: number, clientY: number) {
    for (const element of document.elementsFromPoint(clientX, clientY)) {
      if (!(element instanceof Element)) {
        continue;
      }

      const subgraphId = getToggleSubgraphIdFromTarget(element);
      if (subgraphId) {
        return subgraphId;
      }
    }

    return null;
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

  const {
    activeTouchPointers,
    dragBox,
    dragStyle,
    isAdding,
    isDeselecting,
    cursorClass,
    handlers,
    resetGesture,
  } = useMermaidGestures({
    viewportRef,
    diagramRef,
    toolMode,
    selectionMode,
    updateSelection,
    getNodeFromPoint,
    getToggleSubgraphIdFromPoint,
    toggleSubgraphOnce,
    lastGroupClickRef,
    transformRef,
    setTransformRef,
    intersects,
    getFlowchartNodes,
  });

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport || !focusZoomOnSelection) {
      return;
    }

    const viewportElement = viewport;

    function handleSelectionWheel(event: Event) {
      const wheelEvent = event as globalThis.WheelEvent;

      if ((wheelEvent.target as Element).closest("[data-mermaid-ui]")) {
        return;
      }

      wheelEvent.preventDefault();
      wheelEvent.stopPropagation();
      zoomAroundSelectionRef.current(wheelEvent.deltaY < 0 ? "in" : "out");
    }

    viewportElement.addEventListener("wheel", handleSelectionWheel, { passive: false });

    return () => {
      viewportElement.removeEventListener("wheel", handleSelectionWheel);
    };
  }, [focusZoomOnSelection, selectedNodeIds, svg, isFullscreen]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      resetGesture();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isFullscreen, resetGesture]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!hasFilter) {
        setSelectedNodeIds([]);
        setToolMode(isCoarsePointer ? "pan" : "select");
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
  }, [svg, hasFilter, isCoarsePointer]);

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
      const subgraphId = getSubgraphIdFromNodeElement(node.element, graphSubgraphs);
      const isCollapsedGroup = Boolean(subgraphId && collapsedSubgraphIds.has(subgraphId));
      node.element.style.cursor = isCollapsedGroup ? "pointer" : "pointer";

      const shape = node.element.querySelector<SVGElement>("rect, polygon, circle, ellipse, path");
      if (shape) {
        const isOriginNode = node.id === ORIGIN_NODE_ID;
        shape.style.fill = isOriginNode ? "#7f1d1d" : "";
        shape.style.stroke = selected.has(node.id) ? "#fbbf24" : isOriginNode ? "#f87171" : "";
        shape.style.strokeWidth = selected.has(node.id) ? "4px" : "";
        shape.style.filter = selected.has(node.id)
          ? "drop-shadow(0 0 10px rgba(251, 191, 36, 0.75))"
          : isOriginNode
            ? "drop-shadow(0 0 10px rgba(248, 113, 113, 0.55))"
          : "";

        if (isCollapsedGroup) {
          node.element.setAttribute("title", "Double-click to expand group");
        } else {
          node.element.removeAttribute("title");
        }
      }
    }

    for (const cluster of Array.from(root.querySelectorAll<SVGGElement>("g.cluster"))) {
      const subgraphId = extractSubgraphIdFromCluster(cluster, graphSubgraphs);
      const isExpandedGroup = subgraphId && !collapsedSubgraphIds.has(subgraphId);
      const labelElement = getClusterLabelElement(cluster) as SVGElement | null;

      cluster.style.cursor = "";
      cluster.setAttribute("title", "");

      if (labelElement) {
        labelElement.style.cursor = isExpandedGroup ? "pointer" : "";
        labelElement.setAttribute(
          "title",
          isExpandedGroup ? "Double-click group label to collapse" : ""
        );
      }
    }

    const styledEdgeKeys = new Set<string>();

    for (const edge of getFlowchartEdges(root)) {
      edge.element.style.display = "";

      const edgeKey =
        edge.source && edge.target ? `${edge.source}\0${edge.target}` : edge.element.getAttribute("id") ?? "";

      if (edgeKey && styledEdgeKeys.has(edgeKey)) {
        continue;
      }

      if (edgeKey) {
        styledEdgeKeys.add(edgeKey);
      }

      applyEdgeSelectionStyle(edge, isEdgeConnectedToSelection(edge, selected));
    }
  }, [collapsedSubgraphIds, graphSubgraphs, selectedNodeIds, svg]);

  useEffect(() => {
    const root = diagramRef.current;

    if (!root) {
      return;
    }

    function handleGroupActivation(event: globalThis.MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element) || target.closest("[data-mermaid-ui]")) {
        return;
      }

      const subgraphId = getToggleSubgraphIdFromTarget(target);
      if (!subgraphId) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      toggleSubgraphOnce(subgraphId);
    }

    function handleSvgClick(event: globalThis.MouseEvent) {
      if (event.detail >= 2) {
        handleGroupActivation(event);
      }
    }

    root.addEventListener("click", handleSvgClick);
    root.addEventListener("dblclick", handleGroupActivation);

    return () => {
      root.removeEventListener("click", handleSvgClick);
      root.removeEventListener("dblclick", handleGroupActivation);
    };
  }, [collapsedSubgraphIds, graphSubgraphs, onToggleSubgraph, svg]);

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
        smooth
        onInit={(ref) => {
          syncTransformRef(ref.state.positionX, ref.state.positionY, ref.state.scale);
        }}
        onTransform={(_ref, state) => {
          syncTransformRef(state.positionX, state.positionY, state.scale);
        }}
        doubleClick={{
          disabled: toolMode !== "zoom" || activeTouchPointers > 0,
          mode: "zoomIn",
          step: ZOOM_STEP_FACTOR,
        }}
        wheel={{ step: 0.15, disabled: focusZoomOnSelection }}
        pinch={{ step: 5, disabled: false, excluded: ["data-mermaid-ui"] }}
        panning={{
          disabled: !(isCoarsePointer && toolMode === "pan"),
          velocityDisabled: false,
          excluded: ["data-mermaid-ui"],
        }}
      >
        {({ zoomIn, zoomOut, resetTransform, setTransform, state }) => {
          setTransformRef.current = setTransform;

          function zoomAroundSelection(direction: "in" | "out") {
            const viewport = viewportRef.current;
            const root = diagramRef.current;

            if (!viewport || !root || selectedNodeIds.length === 0) {
              return;
            }

            const screenBounds = getSelectedNodeScreenBounds(root, selectedNodeIds);

            if (!screenBounds) {
              return;
            }

            const viewportRect = viewport.getBoundingClientRect();
            const contentCenter = getContentCenterFromScreenBounds(
              viewportRect,
              state.positionX,
              state.positionY,
              state.scale || 1,
              screenBounds
            );
            const factor = direction === "in" ? ZOOM_STEP_FACTOR : 1 / ZOOM_STEP_FACTOR;
            const newScale = Math.max(0.02, Math.min(1000, (state.scale || 1) * factor));
            const transform = getCenteredTransform(
              viewportRect.width,
              viewportRect.height,
              contentCenter.x,
              contentCenter.y,
              newScale
            );

            setTransform(transform.x, transform.y, transform.scale, ZOOM_ANIMATION_MS);
          }

          zoomAroundSelectionRef.current = zoomAroundSelection;

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

          const selectSubTools = (
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
                  neighborHopsUp: 0,
                  neighborHopsDown: 0,
                });
                setSelectedNodeIds([]);
              }}
            >
              <Split size={14} />
            </SubToolButton>
          );

          const zoomSubTools = (
            <>
              <SubToolButton
                label="Zoom in"
                onClick={() => {
                  if (focusZoomOnSelection) {
                    zoomAroundSelection("in");
                    return;
                  }

                  zoomIn(0.2);
                }}
              >
                <ZoomIn size={14} />
              </SubToolButton>
              <SubToolButton
                label="Zoom out"
                onClick={() => {
                  if (focusZoomOnSelection) {
                    zoomAroundSelection("out");
                    return;
                  }

                  zoomOut(0.2);
                }}
              >
                <ZoomOut size={14} />
              </SubToolButton>
            </>
          );

          const resetSubTools = (
            <>
              <SubToolButton
                label="Fit to view"
                onClick={() => {
                  fitViewRef.current?.();
                }}
              >
                <RotateCcw size={14} />
              </SubToolButton>
              <SubToolButton
                label="Show all nodes - restore full flowchart and collapse parent groups"
                onClick={() => {
                  onResetView();
                  setSelectedNodeIds([]);
                }}
              >
                <Undo2 size={14} />
              </SubToolButton>
            </>
          );

          const coarseSubTools =
            toolMode === "select"
              ? selectSubTools
              : toolMode === "zoom"
                ? zoomSubTools
                : null;

          return (
            <>
              <div
                className="absolute right-4 top-4 z-30 flex flex-col items-end gap-1.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover/diagram:opacity-100"
                data-mermaid-ui
              >
                <div className="flex items-center gap-1.5">
                <ToolCluster
                  icon={<MousePointer2 size={14} />}
                  isActive={toolMode === "select"}
                  isCoarsePointer={isCoarsePointer}
                  label="Select"
                  onClick={() => setToolMode("select")}
                >
                  {selectSubTools}
                </ToolCluster>
                <ToolCluster
                  icon={<Hand size={14} />}
                  isActive={toolMode === "pan"}
                  isCoarsePointer={isCoarsePointer}
                  label="Pan"
                  onClick={() => setToolMode("pan")}
                />
                {isIsolateActive && (
                  <DirectedHopControls
                    hopsUp={viewFilter.neighborHopsUp}
                    hopsDown={viewFilter.neighborHopsDown}
                    onChangeUp={(neighborHopsUp) => {
                      onViewFilterChange({
                        ...viewFilter,
                        neighborHopsUp: clampNeighborHops(neighborHopsUp),
                      });
                    }}
                    onChangeDown={(neighborHopsDown) => {
                      onViewFilterChange({
                        ...viewFilter,
                        neighborHopsDown: clampNeighborHops(neighborHopsDown),
                      });
                    }}
                  />
                )}
                <ToolCluster
                  icon={<ScanSearch size={14} />}
                  isActive={toolMode === "zoom"}
                  isCoarsePointer={isCoarsePointer}
                  label="Zoom"
                  onClick={() => setToolMode("zoom")}
                >
                  {zoomSubTools}
                </ToolCluster>
                <ToolCluster
                  icon={<RotateCcw size={14} />}
                  isActive={false}
                  isCoarsePointer={isCoarsePointer}
                  label="Reset"
                  onClick={() => {
                    fitViewRef.current?.();
                  }}
                >
                  {resetSubTools}
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
                {isCoarsePointer && coarseSubTools && (
                  <div className="flex items-center gap-1 rounded border border-zinc-700 bg-zinc-900/95 p-1">
                    {coarseSubTools}
                  </div>
                )}
                {isCoarsePointer && toolMode !== "select" && toolMode !== "zoom" && (
                  <div className="flex items-center gap-1 rounded border border-zinc-700 bg-zinc-900/95 p-1">
                    {resetSubTools}
                  </div>
                )}
              </div>
              <div
                ref={viewportRef}
                className={cn(
                  "relative w-full overflow-hidden overscroll-contain touch-none select-none",
                  cursorClass,
                  isFullscreen ? "flex-1" : "min-h-[360px]"
                )}
                {...handlers}
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
                {toolMode === "select" && isCoarsePointer && (
                  <SelectionModeToggle mode={selectionMode} onChange={setSelectionMode} />
                )}
                {toolMode === "select" && (
                  <div className="pointer-events-none absolute left-4 top-4 z-20 rounded border border-zinc-700 bg-black/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                    {isCoarsePointer
                      ? selectionMode === "remove"
                        ? "- remove"
                        : selectionMode === "add"
                          ? "+ add select"
                          : selectedNodeIds.length > 0
                            ? "replace select"
                            : "+ select"
                      : dragBox?.ctrlKey
                        ? "- deselect"
                        : dragBox?.shiftKey
                          ? "+ add select"
                          : selectedNodeIds.length > 0
                            ? "+ replace select"
                            : "+ select"}
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
                visible={isIsolateActive}
              />
            </>
          );
        }}
      </TransformWrapper>
      <div className="mt-2 text-center font-mono text-[10px] uppercase tracking-widest text-zinc-600 opacity-100 transition-opacity sm:opacity-0 sm:group-hover/diagram:opacity-100">
        {getGestureHint(isCoarsePointer, hasSubgraphCollapse, toolMode)}
      </div>
    </div>
  );
}

export function MermaidBlock({ content }: { content: string }) {
  const reactId = useId();
  const diagramSource = useMemo(() => content.trim(), [content]);
  const sourceGraph = useMemo(() => parseSourceGraph(diagramSource), [diagramSource]);
  const hasSubgraphs = sourceGraph.subgraphs.length > 0;
  const [viewFilter, setViewFilter] = useState<ViewFilter>(DEFAULT_VIEW_FILTER);
  const [expandedSubgraphIds, setExpandedSubgraphIds] = useState<Set<string>>(() => new Set());
  const collapsedSubgraphIds = useMemo(
    () => new Set(sourceGraph.subgraphs.map((subgraph) => subgraph.id).filter((id) => !expandedSubgraphIds.has(id))),
    [expandedSubgraphIds, sourceGraph.subgraphs]
  );
  const activeSource = useMemo(
    () => createFilteredSourceFromView(diagramSource, viewFilter, expandedSubgraphIds),
    [diagramSource, expandedSubgraphIds, viewFilter]
  );
  const hasFilter = activeSource !== diagramSource;
  const hasSubgraphCollapse = hasSubgraphs && collapsedSubgraphIds.size > 0;
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
      setExpandedSubgraphIds(new Set());
    }, 0);

    return () => window.clearTimeout(timer);
  }, [diagramSource]);

  function toggleSubgraph(subgraphId: string) {
    setExpandedSubgraphIds((current) => {
      const next = new Set(current);

      if (next.has(subgraphId)) {
        next.delete(subgraphId);
      } else {
        next.add(subgraphId);
      }

      return next;
    });
  }

  function resetViewAndCollapseSubgraphs() {
    setViewFilter(DEFAULT_VIEW_FILTER);
    setExpandedSubgraphIds(new Set());
  }

  useEffect(() => {
    setMermaidFullscreen(isFullscreen);

    return () => {
      if (isFullscreen) {
        setMermaidFullscreen(false);
      }
    };
  }, [isFullscreen]);

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
          collapsedSubgraphIds={collapsedSubgraphIds}
          graphSubgraphs={sourceGraph.subgraphs}
          hasFilter={hasFilter}
          hasSubgraphCollapse={hasSubgraphCollapse}
          svg={svg}
          isFullscreen={isFullscreen}
          viewFilter={viewFilter}
          onToggleSubgraph={toggleSubgraph}
          onResetView={resetViewAndCollapseSubgraphs}
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
