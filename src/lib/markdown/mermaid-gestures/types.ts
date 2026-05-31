export type ToolMode = "pan" | "select" | "zoom";

export type SelectionMode = "replace" | "add" | "remove";

export type GestureIntent = "idle" | "pan" | "marquee" | "pinch-pending" | "tap-pending";

export type DragBox = {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  shiftKey: boolean;
  ctrlKey: boolean;
};

export type PanSession = {
  startClientX: number;
  startClientY: number;
  startPositionX: number;
  startPositionY: number;
};

export type PointerRecord = {
  id: number;
  clientX: number;
  clientY: number;
  pointerType: string;
};

export type TransformSnapshot = {
  positionX: number;
  positionY: number;
  scale: number;
};

export type PointerPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
  bounds: DOMRect;
};

export const DRAG_THRESHOLD_PX = 8;
export const DOUBLE_TAP_MS = 450;
export const ZOOM_STEP_FACTOR = 1.8;
export const ZOOM_ANIMATION_MS = 180;
