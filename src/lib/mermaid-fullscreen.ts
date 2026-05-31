"use client";

import { useEffect, useState } from "react";

let isMermaidFullscreenActive = false;
const listeners = new Set<(active: boolean) => void>();

export function setMermaidFullscreen(active: boolean) {
  if (isMermaidFullscreenActive === active) {
    return;
  }

  isMermaidFullscreenActive = active;
  listeners.forEach((listener) => listener(active));
}

export function subscribeMermaidFullscreen(listener: (active: boolean) => void) {
  listeners.add(listener);
  listener(isMermaidFullscreenActive);

  return () => {
    listeners.delete(listener);
  };
}

export function useMermaidFullscreenActive() {
  const [active, setActive] = useState(isMermaidFullscreenActive);

  useEffect(() => subscribeMermaidFullscreen(setActive), []);

  return active;
}
