import { useCallback } from "react";
import { useReactFlow, type Edge } from "@xyflow/react";
import type { AppNode } from "../types";

// Imperative camera commands — the viewport itself lives in ReactFlow's store
// and never re-renders App (read it back via useStore, e.g. ZoomLabel).
export function useMapViewport() {
  const { setCenter } = useReactFlow<AppNode, Edge>();

  const centerOn = useCallback(
    (x: number, y: number) => setCenter(x, y, { zoom: 1, duration: 500 }),
    [setCenter]
  );

  return { centerOn };
}
