"use client";

import { useEffect, useId, useMemo, useState, type PointerEvent, type ReactNode } from "react";
import mermaid from "mermaid";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Maximize2, Minimize2, RotateCcw, ScanSearch, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "inherit",
});

export function isMermaid(code: string, language?: string) {
  const normalizedLanguage = language?.toLowerCase();

  if (normalizedLanguage === "mermaid" || normalizedLanguage === "mmd" || normalizedLanguage === "mermaid-js") {
    return true;
  }

  return /^\s*(%%\{init:|flowchart|graph|sequenceDiagram|classDiagram|stateDiagram|erDiagram|journey|gantt|pie|mindmap|timeline|quadrantChart|requirementDiagram|gitGraph|C4Context)\b/.test(
    code
  );
}

function DiagramButton({
  children,
  isActive,
  label,
  onClick,
}: {
  children: ReactNode;
  isActive?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "rounded border p-1.5 transition-colors hover:bg-zinc-800 hover:text-white",
        isActive
          ? "border-indigo-400 bg-indigo-500/20 text-indigo-200"
          : "border-zinc-700 bg-zinc-900/95 text-zinc-400"
      )}
    >
      {children}
    </button>
  );
}

type SelectionBox = {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
};

function getSelectionStyle(selection: SelectionBox) {
  const left = Math.min(selection.startX, selection.currentX);
  const top = Math.min(selection.startY, selection.currentY);
  const width = Math.abs(selection.currentX - selection.startX);
  const height = Math.abs(selection.currentY - selection.startY);

  return { left, top, width, height };
}

function MermaidViewer({
  svg,
  isFullscreen,
  onToggleFullscreen,
}: {
  svg: string;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}) {
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selection, setSelection] = useState<SelectionBox | null>(null);

  useEffect(() => {
    setIsSelectionMode(false);
    setSelection(null);
  }, [isFullscreen]);

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
        doubleClick={{ mode: "zoomIn", step: 1.8 }}
        wheel={{ step: 0.18 }}
        pinch={{ step: 8 }}
        panning={{ disabled: isSelectionMode, velocityDisabled: false }}
      >
        {({ zoomIn, zoomOut, resetTransform, centerView, setTransform, state }) => {
          const selectionStyle = selection ? getSelectionStyle(selection) : null;

          function getPointerPosition(event: PointerEvent<HTMLDivElement>) {
            const bounds = event.currentTarget.getBoundingClientRect();

            return {
              x: event.clientX - bounds.left,
              y: event.clientY - bounds.top,
              width: bounds.width,
              height: bounds.height,
            };
          }

          function handleSelectionStart(event: PointerEvent<HTMLDivElement>) {
            if (!isSelectionMode || event.button !== 0) {
              return;
            }

            event.preventDefault();
            event.currentTarget.setPointerCapture(event.pointerId);
            const point = getPointerPosition(event);
            setSelection({
              startX: point.x,
              startY: point.y,
              currentX: point.x,
              currentY: point.y,
            });
          }

          function handleSelectionMove(event: PointerEvent<HTMLDivElement>) {
            if (!isSelectionMode || !selection) {
              return;
            }

            event.preventDefault();
            const point = getPointerPosition(event);
            setSelection((current) =>
              current
                ? {
                    ...current,
                    currentX: Math.max(0, Math.min(point.x, point.width)),
                    currentY: Math.max(0, Math.min(point.y, point.height)),
                  }
                : current
            );
          }

          function handleSelectionEnd(event: PointerEvent<HTMLDivElement>) {
            if (!isSelectionMode || !selection) {
              return;
            }

            event.preventDefault();
            const point = getPointerPosition(event);
            const finalSelection = {
              ...selection,
              currentX: Math.max(0, Math.min(point.x, point.width)),
              currentY: Math.max(0, Math.min(point.y, point.height)),
            };
            const rect = getSelectionStyle(finalSelection);

            setSelection(null);
            setIsSelectionMode(false);

            if (rect.width < 12 || rect.height < 12) {
              return;
            }

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

          return (
          <>
            <div className="absolute right-4 top-4 z-10 flex gap-1.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover/diagram:opacity-100">
              <DiagramButton label="Zoom in" onClick={() => zoomIn(1.8)}>
                <ZoomIn size={14} />
              </DiagramButton>
              <DiagramButton label="Zoom out" onClick={() => zoomOut(1.8)}>
                <ZoomOut size={14} />
              </DiagramButton>
              <DiagramButton
                isActive={isSelectionMode}
                label={isSelectionMode ? "Cancel area zoom" : "Zoom to selected area"}
                onClick={() => {
                  setSelection(null);
                  setIsSelectionMode((current) => !current);
                }}
              >
                <ScanSearch size={14} />
              </DiagramButton>
              <DiagramButton
                label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                onClick={onToggleFullscreen}
              >
                {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </DiagramButton>
              <DiagramButton
                label="Reset view"
                onClick={() => {
                  resetTransform();
                  window.requestAnimationFrame(() => centerView(1));
                }}
              >
                <RotateCcw size={14} />
              </DiagramButton>
            </div>
            <div
              className={cn(
                "relative w-full overflow-hidden",
                isSelectionMode ? "cursor-crosshair" : "cursor-grab active:cursor-grabbing",
                isFullscreen ? "flex-1" : "min-h-[360px]"
              )}
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
                  className="mermaid-diagram max-w-none p-4 [&_svg]:h-auto [&_svg]:max-w-none"
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              </TransformComponent>
              {isSelectionMode && (
                <div
                  className="absolute inset-0 z-20 bg-black/10"
                  onPointerDown={handleSelectionStart}
                  onPointerMove={handleSelectionMove}
                  onPointerUp={handleSelectionEnd}
                  onPointerCancel={() => setSelection(null)}
                >
                  {selectionStyle && (
                    <div
                      className="absolute border border-indigo-300 bg-indigo-400/15 shadow-[0_0_0_9999px_rgba(0,0,0,0.18)]"
                      style={selectionStyle}
                    />
                  )}
                </div>
              )}
            </div>
          </>
          );
        }}
      </TransformWrapper>
      <div className="mt-2 text-center font-mono text-[10px] uppercase tracking-widest text-zinc-600 opacity-100 transition-opacity sm:opacity-0 sm:group-hover/diagram:opacity-100">
        Scroll to zoom - drag to pan - fullscreen for large charts
      </div>
    </div>
  );
}

export function MermaidBlock({ content }: { content: string }) {
  const reactId = useId();
  const diagramSource = useMemo(() => content.trim(), [content]);
  const renderId = useMemo(
    () => `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [reactId]
  );
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
        await mermaid.parse(diagramSource);
        const { svg: renderedSvg } = await mermaid.render(renderId, diagramSource);
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

    if (diagramSource) {
      renderMermaid();
    }

    return () => {
      isMounted = false;
    };
  }, [diagramSource, renderId]);

  return (
    <div className="group relative my-8 rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 transition-all hover:border-zinc-700/50">
      {error ? (
        <div className="flex h-40 items-center justify-center rounded-lg border border-red-900/20 bg-red-950/10 font-mono text-sm text-red-400">
          Failed to render flowchart
        </div>
      ) : svg ? (
        <MermaidViewer
          svg={svg}
          isFullscreen={isFullscreen}
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
