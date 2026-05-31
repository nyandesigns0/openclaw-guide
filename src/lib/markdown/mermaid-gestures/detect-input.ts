"use client";

import { useEffect, useState } from "react";

export function isTouchPointer(pointerType: string) {
  return pointerType === "touch";
}

export function useCoarsePointer() {
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse)");

    function update() {
      setIsCoarse(query.matches);
    }

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return isCoarse;
}
