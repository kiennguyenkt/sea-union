import { useCallback, useMemo, useRef, useState } from "react";
import type { Edge, ReactFlowInstance, Viewport } from "@xyflow/react";
import { islands, routes, contributions, players } from "../data/demo";
import { factions } from "../data/factions";
import {
  buildLeaderboard,
  nodeDetails,
  scoresForNode,
  searchIslands,
} from "../domain/selectors";
import { buildMapNodes, buildMapEdges } from "../domain/mapGraph";
import type { AppNode, FactionScore } from "../types";

const scoresByNode = new Map<string, FactionScore[]>(
  islands.map((node) => [
    node.id,
    scoresForNode(node.id, contributions, factions),
  ])
);
const edges = buildMapEdges(routes, islands, factions);
const leaderboard = buildLeaderboard(players, contributions, factions);
const baseCount = islands.filter((node) => node.base).length;

export type TacticalMapTab = "node" | "ranking";

export function useTacticalMap() {
  const [selected, setSelected] = useState<string | null>("2-40");
  const [pinned, setPinned] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState("all");
  const [tab, setTab] = useState<TacticalMapTab>("node");
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(1);
  const [debug, setDebug] = useState(false);
  const flowRef = useRef<ReactFlowInstance<AppNode, Edge> | null>(null);

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
  const initializeFlow = useCallback(
    (instance: ReactFlowInstance<AppNode, Edge>) => {
      flowRef.current = instance;
    },
    []
  );
  const updateViewport = useCallback(
    (_: unknown, viewport: Viewport) => setZoom(viewport.zoom),
    []
  );
  const fitMap = useCallback(
    () => flowRef.current?.fitView({ padding: 0.15, duration: 500 }),
    []
  );
  const focusIsland = useCallback(
    (id: string) => {
      const island = islands.find((node) => node.id === id);
      if (!island) return;
      openIsland(id);
      setQuery("");
      flowRef.current?.setCenter(island.position.x, island.position.y, {
        zoom: 1,
        duration: 500,
      });
    },
    [openIsland]
  );

  const nodes = useMemo(
    () =>
      buildMapNodes(
        islands,
        scoresByNode,
        factions,
        { selected, pinned, showAll, filter, debug },
        { openIsland, togglePin }
      ),
    [selected, pinned, showAll, filter, debug, openIsland, togglePin]
  );
  const details = useMemo(
    () => nodeDetails(selected, islands, contributions, players, factions),
    [selected]
  );
  const matches = useMemo(() => searchIslands(query, islands), [query]);

  return {
    nodes,
    edges,
    factions,
    leaderboard,
    baseCount,
    islandCount: islands.length - baseCount,
    details,
    pinned,
    showAll,
    filter,
    debug,
    tab,
    query,
    zoom,
    matches,
    actions: {
      openIsland,
      closeIsland,
      togglePin,
      clearPins,
      selectFaction,
      toggleDebug,
      initializeFlow,
      updateViewport,
      fitMap,
      focusIsland,
      setShowAll,
      setTab,
      setQuery,
    },
  };
}

export type TacticalMapResult = ReturnType<typeof useTacticalMap>;
