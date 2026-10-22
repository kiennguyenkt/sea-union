import { useCallback, useMemo, useState } from "react";
import { routes, contributions, players } from "../data/demo";
import { factions } from "../data/factions";
import { nodeDetails, searchIslands } from "../domain/selectors";
import { buildMapEdges, buildMapNodes } from "../domain/mapGraph";
import {
  scoresByNode,
  leaderboard,
  baseCount,
  ownedIslands,
  claims,
} from "../domain/mapData";
import { useMapViewport } from "./useMapViewport";

export type TacticalMapTab = "node" | "ranking";

export function useTacticalMap() {
  const [selected, setSelected] = useState<string | null>("2-40");
  const [pinned, setPinned] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState("all");
  const [tab, setTab] = useState<TacticalMapTab>("node");
  const [debug, setDebug] = useState(false);
  const [query, setQuery] = useState("");
  const { fitMap, centerOn } = useMapViewport();
  const matches = useMemo(() => searchIslands(query, ownedIslands), [query]);

  const openIsland = useCallback((id: string) => {
    setSelected(id);
    setTab("node");
  }, []);
  const closeIsland = useCallback(() => setSelected(null), []);
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
  const selectFaction = useCallback(
    (id: string) => setFilter((previous) => (previous === id ? "all" : id)),
    []
  );
  const toggleDebug = useCallback(() => setDebug((value) => !value), []);
  const focusIsland = useCallback(
    (id: string) => {
      const island = ownedIslands.find((node) => node.id === id);
      if (!island) return;
      openIsland(id);
      setQuery("");
      centerOn(island.position.x, island.position.y);
    },
    [openIsland, setQuery, centerOn]
  );

  const nodes = useMemo(
    () =>
      buildMapNodes(
        ownedIslands,
        scoresByNode,
        factions,
        { selected, pinned, showAll, filter, debug },
        { openIsland, togglePin }
      ),
    [selected, pinned, showAll, filter, debug, openIsland, togglePin]
  );
  const edges = useMemo(
    () => buildMapEdges(routes, ownedIslands, factions, filter),
    [filter]
  );
  const details = useMemo(
    () =>
      nodeDetails(
        selected,
        ownedIslands,
        contributions,
        players,
        factions,
        claims.connectedByNode
      ),
    [selected]
  );

  return {
    nodes,
    edges,
    factions,
    leaderboard,
    baseCount,
    islandCount: ownedIslands.length - baseCount,
    details,
    pinned,
    showAll,
    filter,
    debug,
    tab,
    query,
    matches,
    actions: {
      openIsland,
      closeIsland,
      togglePin,
      clearPins,
      selectFaction,
      toggleDebug,
      fitMap,
      focusIsland,
      setShowAll,
      setTab,
      setQuery,
    },
  };
}

export type TacticalMapResult = ReturnType<typeof useTacticalMap>;
