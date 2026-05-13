"use client";

import { useEffect, useState } from "react";
import mermaid from "mermaid";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "inherit",
});

export function isMermaid(code: string, language?: string) {
  return language === "mermaid";
}

export function MermaidBlock({ content }: { content: string }) {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function renderMermaid() {
      try {
        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, content);
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

    if (content) {
      renderMermaid();
    }

    return () => {
      isMounted = false;
    };
  }, [content]);

  return (
    <div className="group relative my-8 rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 transition-all hover:border-zinc-700/50">
      {error ? (
        <div className="flex h-40 items-center justify-center text-red-400 font-mono text-sm bg-red-950/10 rounded-lg border border-red-900/20">
          Failed to render flowchart
        </div>
      ) : svg ? (
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          centerOnInit
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="absolute top-4 right-4 z-10 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => zoomIn()}
                  className="p-1.5 rounded bg-zinc-900/90 border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>
                <button
                  onClick={() => zoomOut()}
                  className="p-1.5 rounded bg-zinc-900/90 border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>
                <button
                  onClick={() => resetTransform()}
                  className="p-1.5 rounded bg-zinc-900/90 border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  title="Reset"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
              <div className="flex justify-center w-full overflow-hidden cursor-grab active:cursor-grabbing rounded-lg">
                <TransformComponent
                  wrapperStyle={{ width: "100%", height: "auto", minHeight: "300px" }}
                  contentStyle={{ width: "100%", display: "flex", justifyContent: "center" }}
                >
                  <div 
                    className="mermaid-diagram p-4"
                    dangerouslySetInnerHTML={{ __html: svg }}
                  />
                </TransformComponent>
              </div>
            </>
          )}
        </TransformWrapper>
      ) : (
        <div className="flex h-40 items-center justify-center text-zinc-500 font-mono text-sm animate-pulse">
          Loading flowchart...
        </div>
      )}
      
      <div className="mt-2 text-[10px] text-zinc-600 font-mono text-center uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        Scroll to zoom • Drag to pan
      </div>
    </div>
  );
}
