import { useCallback, useState } from "react";
import { useReactFlow, type Edge } from "@xyflow/react";
import type { AppNode } from "../types";
import { ownedIslands } from "../domain/mapData";

const FOCUS_OPTIONS = { zoom: 1, duration: 500 } as const;

// Island selection state — which node the details panel shows (selected),
// which nodes stay visible regardless of filter (pinned) — plus the camera
// command that follows a node (focus). Fitting the whole map is a separate
// command with its own consumers (useFitMap). Commands that also touch other
// owners' state (sidebar tab, search query) are composed in useTacticalMap.
export function useIslandSelection() {
  const [selected, setSelected] = useState<string | null>("2-40");
  const [pinned, setPinned] = useState<Set<string>>(new Set());
  const { setCenter } = useReactFlow<AppNode, Edge>();

  const open = useCallback((id: string) => setSelected(id), []);
  const close = useCallback(() => setSelected(null), []);
  const togglePin = useCallback(
    (id: string) =>
      setPinned((previous) => {
        const next = new Set(previous);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      }),
    []
  );
  const clearPins = useCallback(() => setPinned(new Set()), []);
  const focus = useCallback(
    (id: string) => {
      const island = ownedIslands.find((node) => node.id === id);
      if (!island) return;
      open(id);
      setCenter(island.position.x, island.position.y, FOCUS_OPTIONS);
    },
    [open, setCenter]
  );

  return { selected, pinned, open, close, togglePin, clearPins, focus };
}
