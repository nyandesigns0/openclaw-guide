"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type RefObject,
} from "react";
import { useCoarsePointer } from "./detect-input";
import {
  countTouchPointers,
  createPanSession,
  getDragStyle,
  getPanTransform,
  isClickDrag,
  movementExceedsThreshold,
  resolveInitialIntent,
  resolveSelectionFlags,
  shouldDeferCapture,
  shouldDelegateTouchToLibrary,
} from "./gesture-state";
import { isDoubleTap, zoomInAtPoint, zoomToRect, type DoubleTapState } from "./gesture-router";
import {
  type DragBox,
  type GestureIntent,
  type PanSession,
  type PointerPosition,
  type PointerRecord,
  type SelectionMode,
  type ToolMode,
  type TransformSnapshot,
} from "./types";

type SetTransform = (x: number, y: number, scale: number, animationTime?: number) => void;

type UseMermaidGesturesOptions = {
  viewportRef: RefObject<HTMLDivElement | null>;
  diagramRef: RefObject<HTMLDivElement | null>;
  toolMode: ToolMode;
  selectionMode: SelectionMode;
  updateSelection: (nodeIds: string[], options: { add: boolean; remove: boolean }) => void;
  getNodeFromPoint: (clientX: number, clientY: number) => string | null;
  getToggleSubgraphIdFromPoint: (clientX: number, clientY: number) => string | null;
  toggleSubgraphOnce: (subgraphId: string) => void;
  lastGroupClickRef: RefObject<{ subgraphId: string; time: number }>;
  transformRef: RefObject<TransformSnapshot>;
  setTransformRef: RefObject<SetTransform | null>;
  intersects: (a: DOMRect, b: DOMRect) => boolean;
  getFlowchartNodes: (root: HTMLElement) => { element: SVGGElement; id: string }[];
};

function getPointerPosition(event: PointerEvent<HTMLDivElement>): PointerPosition {
  const bounds = event.currentTarget.getBoundingClientRect();

  return {
    x: event.clientX - bounds.left,
    y: event.clientY - bounds.top,
    width: bounds.width,
    height: bounds.height,
    bounds,
  };
}

export function useMermaidGestures({
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
}: UseMermaidGesturesOptions) {
  const isCoarsePointer = useCoarsePointer();
  const [dragBox, setDragBox] = useState<DragBox | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const middlePanRef = useRef<PanSession | null>(null);
  const panSessionRef = useRef<PanSession | null>(null);
  const [activeTouchPointers, setActiveTouchPointers] = useState(0);
  const [intent, setIntent] = useState<GestureIntent>("idle");

  const activePointersRef = useRef<Map<number, PointerRecord>>(new Map());
  const capturedPointerRef = useRef<number | null>(null);
  const lastTapRef = useRef<DoubleTapState>({ time: 0, clientX: 0, clientY: 0 });
  const pendingPanRef = useRef<{ pointerId: number; startX: number; startY: number } | null>(null);

  const clearForPinchDelegation = useCallback(() => {
    setDragBox(null);
    middlePanRef.current = null;
    panSessionRef.current = null;
    setIsPanning(false);
    setIntent("pinch-pending");
    pendingPanRef.current = null;
  }, []);

  const releaseCapture = useCallback((target: HTMLDivElement | null) => {
    if (capturedPointerRef.current !== null && target) {
      try {
        target.releasePointerCapture(capturedPointerRef.current);
      } catch {
        // Pointer may already be released.
      }
    }

    capturedPointerRef.current = null;
  }, []);

  const resetGesture = useCallback(
    (target?: HTMLDivElement | null) => {
      releaseCapture(target ?? viewportRef.current);
      setDragBox(null);
      middlePanRef.current = null;
      panSessionRef.current = null;
      setIsPanning(false);
      setIntent("idle");
      pendingPanRef.current = null;
      activePointersRef.current.clear();
      setActiveTouchPointers(0);
    },
    [releaseCapture, viewportRef]
  );

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const viewportElement = viewport;

    function preventViewportScroll(event: Event) {
      if ((event.target as Element).closest("[data-mermaid-ui]")) {
        return;
      }

      event.preventDefault();
    }

    viewportElement.addEventListener("wheel", preventViewportScroll, { passive: false, capture: true });

    return () => {
      viewportElement.removeEventListener("wheel", preventViewportScroll, { capture: true });
    };
  }, [viewportRef]);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if ((event.target as Element).closest("[data-mermaid-ui]")) {
        return;
      }

      if (event.pointerType === "touch" && toolMode === "pan") {
        return;
      }

      const transform = transformRef.current;
      const setTransform = setTransformRef.current;

      if (!setTransform) {
        return;
      }

      activePointersRef.current.set(event.pointerId, {
        id: event.pointerId,
        clientX: event.clientX,
        clientY: event.clientY,
        pointerType: event.pointerType,
      });

      const touchCount = countTouchPointers(activePointersRef.current);
      setActiveTouchPointers(touchCount);

      if (event.pointerType === "touch" && shouldDelegateTouchToLibrary(toolMode, touchCount)) {
        releaseCapture(event.currentTarget);
        clearForPinchDelegation();
        return;
      }

      if (event.button === 1) {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        capturedPointerRef.current = event.pointerId;
        setDragBox(null);
        middlePanRef.current = createPanSession(
          event.clientX,
          event.clientY,
          transform.positionX,
          transform.positionY
        );
        setIsPanning(true);
        setIntent("pan");
        return;
      }

      if (event.button !== 0) {
        return;
      }

      const nextIntent = resolveInitialIntent(toolMode, event.pointerType, touchCount);
      setIntent(nextIntent);

      if (nextIntent === "pan") {
        event.currentTarget.setPointerCapture(event.pointerId);
        capturedPointerRef.current = event.pointerId;
        panSessionRef.current = createPanSession(
          event.clientX,
          event.clientY,
          transform.positionX,
          transform.positionY
        );
        setIsPanning(true);
        setDragBox(null);
        return;
      }

      if (nextIntent === "pinch-pending") {
        return;
      }

      const point = getPointerPosition(event);
      pendingPanRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
      };

      setDragBox({
        startX: point.x,
        startY: point.y,
        currentX: point.x,
        currentY: point.y,
        shiftKey: event.shiftKey,
        ctrlKey: event.ctrlKey || event.metaKey,
      });
    },
    [clearForPinchDelegation, releaseCapture, setTransformRef, toolMode, transformRef]
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "touch" && toolMode === "pan") {
        return;
      }

      const pointer = activePointersRef.current.get(event.pointerId);

      if (pointer) {
        activePointersRef.current.set(event.pointerId, {
          ...pointer,
          clientX: event.clientX,
          clientY: event.clientY,
        });
      }

      const touchCount = countTouchPointers(activePointersRef.current);
      setActiveTouchPointers(touchCount);

      if (event.pointerType === "touch" && shouldDelegateTouchToLibrary(toolMode, touchCount)) {
        releaseCapture(event.currentTarget);
        clearForPinchDelegation();
        return;
      }

      const setTransform = setTransformRef.current;
      const transform = transformRef.current;

      if (!setTransform) {
        return;
      }

      const activePan = middlePanRef.current ?? panSessionRef.current;

      if (activePan) {
        event.preventDefault();
        const next = getPanTransform(activePan, event.clientX, event.clientY, transform.scale || 1);
        setTransform(next.x, next.y, next.scale, 0);
        return;
      }

      if (intent === "pinch-pending") {
        return;
      }

      if (!dragBox) {
        return;
      }

      if (
        shouldDeferCapture(intent, toolMode) &&
        capturedPointerRef.current === null &&
        pendingPanRef.current?.pointerId === event.pointerId
      ) {
        const pending = pendingPanRef.current;

        if (
          movementExceedsThreshold(pending.startX, pending.startY, event.clientX, event.clientY)
        ) {
          event.currentTarget.setPointerCapture(event.pointerId);
          capturedPointerRef.current = event.pointerId;
          setIntent("marquee");
        } else {
          return;
        }
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
    },
    [
      clearForPinchDelegation,
      dragBox,
      intent,
      releaseCapture,
      setTransformRef,
      toolMode,
      transformRef,
    ]
  );

  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "touch" && toolMode === "pan") {
        return;
      }

      activePointersRef.current.delete(event.pointerId);

      const touchCount = countTouchPointers(activePointersRef.current);
      setActiveTouchPointers(touchCount);

      const setTransform = setTransformRef.current;
      const transform = transformRef.current;

      if (middlePanRef.current) {
        event.preventDefault();
        middlePanRef.current = null;
        setIsPanning(Boolean(panSessionRef.current));
        releaseCapture(event.currentTarget);
        if (touchCount === 0) {
          setIntent("idle");
        }
        return;
      }

      if (panSessionRef.current) {
        event.preventDefault();
        panSessionRef.current = null;
        setIsPanning(false);
        releaseCapture(event.currentTarget);
        if (touchCount === 0) {
          setIntent("idle");
        }
        return;
      }

      if (intent === "pinch-pending" || (event.pointerType === "touch" && touchCount > 0)) {
        if (touchCount === 0) {
          setIntent("idle");
        }
        return;
      }

      if (!dragBox || !setTransform) {
        if (touchCount === 0) {
          resetGesture(event.currentTarget);
        }
        return;
      }

      const point = getPointerPosition(event);
      const finalDragBox: DragBox = {
        ...dragBox,
        currentX: Math.max(0, Math.min(point.x, point.width)),
        currentY: Math.max(0, Math.min(point.y, point.height)),
        shiftKey: event.shiftKey || dragBox.shiftKey,
        ctrlKey: event.ctrlKey || event.metaKey || dragBox.ctrlKey,
      };
      const rect = getDragStyle(finalDragBox);
      const isClick = isClickDrag(finalDragBox);
      const selectionFlags = resolveSelectionFlags(
        selectionMode,
        finalDragBox.shiftKey,
        finalDragBox.ctrlKey
      );

      setDragBox(null);
      pendingPanRef.current = null;
      releaseCapture(event.currentTarget);

      if (toolMode === "select") {
        if (isClick) {
          const now = window.performance.now();
          const toggleSubgraphId = getToggleSubgraphIdFromPoint(event.clientX, event.clientY);

          if (toggleSubgraphId) {
            const lastClick = lastGroupClickRef.current;

            if (
              lastClick &&
              lastClick.subgraphId === toggleSubgraphId &&
              now - lastClick.time < 450
            ) {
              lastGroupClickRef.current = { subgraphId: "", time: 0 };
              toggleSubgraphOnce(toggleSubgraphId);
              if (touchCount === 0) {
                setIntent("idle");
              }
              return;
            }

            if (lastGroupClickRef.current) {
              lastGroupClickRef.current = { subgraphId: toggleSubgraphId, time: now };
            }
          } else if (lastGroupClickRef.current) {
            lastGroupClickRef.current = { subgraphId: "", time: 0 };
          }

          const nodeId = getNodeFromPoint(event.clientX, event.clientY);
          updateSelection(nodeId ? [nodeId] : [], selectionFlags);
          if (touchCount === 0) {
            setIntent("idle");
          }
          return;
        }

        event.preventDefault();
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

        updateSelection(nodeIds, selectionFlags);
        if (touchCount === 0) {
          setIntent("idle");
        }
        return;
      }

      if (toolMode === "zoom") {
        if (isClick) {
          const now = window.performance.now();
          const viewportRect = event.currentTarget.getBoundingClientRect();

          if (isDoubleTap(lastTapRef.current, event.clientX, event.clientY, now)) {
            lastTapRef.current = { time: 0, clientX: 0, clientY: 0 };
            zoomInAtPoint(viewportRect, event.clientX, event.clientY, transform, setTransform);
          } else {
            lastTapRef.current = {
              time: now,
              clientX: event.clientX,
              clientY: event.clientY,
            };
          }

          if (touchCount === 0) {
            setIntent("idle");
          }
          return;
        }

        event.preventDefault();
        zoomToRect(
          rect,
          point.width,
          point.height,
          transform.positionX,
          transform.positionY,
          transform.scale || 1,
          setTransform
        );
        if (touchCount === 0) {
          setIntent("idle");
        }
        return;
      }

      if (toolMode === "pan" && isClick) {
        const now = window.performance.now();
        const viewportRect = event.currentTarget.getBoundingClientRect();

        if (isDoubleTap(lastTapRef.current, event.clientX, event.clientY, now)) {
          lastTapRef.current = { time: 0, clientX: 0, clientY: 0 };
          zoomInAtPoint(viewportRect, event.clientX, event.clientY, transform, setTransform);
        } else {
          lastTapRef.current = {
            time: now,
            clientX: event.clientX,
            clientY: event.clientY,
          };
        }
      }

      if (touchCount === 0) {
        setIntent("idle");
      }
    },
    [
      diagramRef,
      dragBox,
      getFlowchartNodes,
      getNodeFromPoint,
      getToggleSubgraphIdFromPoint,
      intent,
      intersects,
      lastGroupClickRef,
      releaseCapture,
      resetGesture,
      selectionMode,
      setTransformRef,
      toggleSubgraphOnce,
      toolMode,
      transformRef,
      updateSelection,
    ]
  );

  const handlePointerCancel = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      activePointersRef.current.delete(event.pointerId);
      const touchCount = countTouchPointers(activePointersRef.current);
      setActiveTouchPointers(touchCount);

      if (touchCount === 0) {
        resetGesture(event.currentTarget);
      }
    },
    [resetGesture]
  );

  const isDeselecting =
    toolMode === "select" && (Boolean(dragBox?.ctrlKey) || selectionMode === "remove");
  const isAdding =
    toolMode === "select" && (Boolean(dragBox?.shiftKey) || selectionMode === "add");

  const cursorClass =
    toolMode === "select"
      ? "cursor-crosshair"
      : toolMode === "zoom"
        ? "cursor-zoom-in"
        : isPanning
          ? "cursor-grabbing"
          : "cursor-grab";

  return {
    isCoarsePointer,
    activeTouchPointers,
    dragBox,
    dragStyle: dragBox ? getDragStyle(dragBox) : null,
    isPanning,
    isAdding,
    isDeselecting,
    cursorClass,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
    },
    resetGesture,
  };
}

export type { ToolMode, SelectionMode } from "./types";
