import {
  DRAG_THRESHOLD_PX,
  type DragBox,
  type GestureIntent,
  type PanSession,
  type PointerRecord,
  type SelectionMode,
  type ToolMode,
} from "./types";

export function countTouchPointers(pointers: Map<number, PointerRecord>) {
  let count = 0;

  for (const pointer of pointers.values()) {
    if (pointer.pointerType === "touch") {
      count += 1;
    }
  }

  return count;
}

export function getDragStyle(dragBox: DragBox) {
  const left = Math.min(dragBox.startX, dragBox.currentX);
  const top = Math.min(dragBox.startY, dragBox.currentY);
  const width = Math.abs(dragBox.currentX - dragBox.startX);
  const height = Math.abs(dragBox.currentY - dragBox.startY);

  return { left, top, width, height };
}

export function isClickDrag(dragBox: DragBox) {
  const rect = getDragStyle(dragBox);
  return rect.width < DRAG_THRESHOLD_PX && rect.height < DRAG_THRESHOLD_PX;
}

export function resolveSelectionFlags(
  selectionMode: SelectionMode,
  shiftKey: boolean,
  ctrlKey: boolean
) {
  if (shiftKey) {
    return { add: true, remove: false };
  }

  if (ctrlKey) {
    return { add: false, remove: true };
  }

  return {
    add: selectionMode === "add",
    remove: selectionMode === "remove",
  };
}

export function shouldDelegateTouchToLibrary(toolMode: ToolMode, touchPointerCount: number) {
  return toolMode === "pan" || touchPointerCount > 1;
}

export function resolveInitialIntent(
  toolMode: ToolMode,
  pointerType: string,
  touchPointerCount: number
): GestureIntent {
  if (pointerType === "touch" && touchPointerCount > 1) {
    return "pinch-pending";
  }

  if (toolMode === "pan" && pointerType !== "touch") {
    return "pan";
  }

  return "tap-pending";
}

export function shouldDeferCapture(intent: GestureIntent, toolMode: ToolMode) {
  return toolMode !== "pan" && intent === "tap-pending";
}

export function movementExceedsThreshold(
  startX: number,
  startY: number,
  currentX: number,
  currentY: number
) {
  return (
    Math.abs(currentX - startX) >= DRAG_THRESHOLD_PX ||
    Math.abs(currentY - startY) >= DRAG_THRESHOLD_PX
  );
}

export function createPanSession(
  clientX: number,
  clientY: number,
  positionX: number,
  positionY: number
): PanSession {
  return {
    startClientX: clientX,
    startClientY: clientY,
    startPositionX: positionX,
    startPositionY: positionY,
  };
}

export function getPanTransform(pan: PanSession, clientX: number, clientY: number, scale: number) {
  return {
    x: pan.startPositionX + clientX - pan.startClientX,
    y: pan.startPositionY + clientY - pan.startClientY,
    scale,
  };
}
