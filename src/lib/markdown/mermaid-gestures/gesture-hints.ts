import type { ToolMode } from "./types";

export function getGestureHint(
  isCoarsePointer: boolean,
  hasSubgraphCollapse: boolean,
  toolMode: ToolMode
) {
  if (isCoarsePointer) {
    if (hasSubgraphCollapse) {
      return "Pinch to zoom · One finger to pan · Select tool to pick nodes · Double-tap groups to expand";
    }

    if (toolMode === "select") {
      return "Tap to select nodes · Drag to marquee · Use Add/Remove toggle · Pinch to zoom";
    }

    if (toolMode === "zoom") {
      return "Drag to zoom area · Double-tap to zoom in · Pinch to zoom · Switch to Pan to move canvas";
    }

    return "One finger to pan · Pinch to zoom · Select tool to pick nodes · Zoom tool to focus area";
  }

  if (hasSubgraphCollapse) {
    return "Double-click hexagon group nodes to expand or collapse - scroll wheel zooms at cursor inside chart - middle mouse pans";
  }

  return "Scroll wheel zooms at cursor inside chart - select nodes to focus toolbar zoom on selection - middle mouse pans";
}
