import {
  DOUBLE_TAP_MS,
  ZOOM_ANIMATION_MS,
  ZOOM_STEP_FACTOR,
  type TransformSnapshot,
} from "./types";

export type DoubleTapState = {
  time: number;
  clientX: number;
  clientY: number;
};

export function isDoubleTap(
  lastTap: DoubleTapState,
  clientX: number,
  clientY: number,
  now: number,
  maxDistance = 24
) {
  if (now - lastTap.time > DOUBLE_TAP_MS) {
    return false;
  }

  const dx = clientX - lastTap.clientX;
  const dy = clientY - lastTap.clientY;

  return Math.hypot(dx, dy) <= maxDistance;
}

export function zoomInAtPoint(
  viewportRect: DOMRect,
  clientX: number,
  clientY: number,
  transform: TransformSnapshot,
  setTransform: (x: number, y: number, scale: number, animationTime?: number) => void
) {
  const localX = clientX - viewportRect.left;
  const localY = clientY - viewportRect.top;
  const scale = transform.scale || 1;
  const contentX = (localX - transform.positionX) / scale;
  const contentY = (localY - transform.positionY) / scale;
  const newScale = Math.max(0.02, Math.min(1000, scale * ZOOM_STEP_FACTOR));
  const targetX = localX - contentX * newScale;
  const targetY = localY - contentY * newScale;

  setTransform(targetX, targetY, newScale, ZOOM_ANIMATION_MS);
}

export function zoomToRect(
  rect: { left: number; top: number; width: number; height: number },
  viewportWidth: number,
  viewportHeight: number,
  positionX: number,
  positionY: number,
  scale: number,
  setTransform: (x: number, y: number, targetScale: number, animationTime?: number) => void
) {
  const sourceScale = scale || 1;
  const contentLeft = (rect.left - positionX) / sourceScale;
  const contentTop = (rect.top - positionY) / sourceScale;
  const contentWidth = rect.width / sourceScale;
  const contentHeight = rect.height / sourceScale;
  const contentCenterX = contentLeft + contentWidth / 2;
  const contentCenterY = contentTop + contentHeight / 2;
  const targetScale = Math.max(
    0.02,
    Math.min(1000, Math.min(viewportWidth / contentWidth, viewportHeight / contentHeight) * 0.9)
  );
  const targetX = viewportWidth / 2 - contentCenterX * targetScale;
  const targetY = viewportHeight / 2 - contentCenterY * targetScale;

  setTransform(targetX, targetY, targetScale, 240);
}
