import { useCallback, useMemo, useRef, useState } from "react";
import { islands, routes, contributions, players } from "../data/demo.js";
import { factions } from "../data/factions.js";
import {
  buildLeaderboard,
  nodeDetails,
  scoresForNode,
  searchIslands,
} from "../domain/selectors.js";
import { buildMapNodes, buildMapEdges } from "../domain/mapGraph.js";

const scoresByNode = new Map(
  islands.map((node) => [
    node.id,
    scoresForNode(node.id, contributions, factions),
  ])
);
const edges = buildMapEdges(routes, islands, factions);
const leaderboard = buildLeaderboard(players, contributions, factions);
const baseCount = islands.filter((node) => node.base).length;

export function useTacticalMap() {
  const [selected, setSelected] = useState("2-40");
  const [pinned, setPinned] = useState(new Set());
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState("all");
  const [tab, setTab] = useState("node");
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(1);
  const flowRef = useRef(null);

  const openIsland = useCallback((id) => {
    setSelected(id);
    setTab("node");
  }, []);
  const closeIsland = useCallback(() => setSelected(null), []);
  const togglePin = useCallback(
    (id) =>
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
    (id) => setFilter((previous) => (previous === id ? "all" : id)),
    []
  );
  const initializeFlow = useCallback((instance) => {
    flowRef.current = instance;
  }, []);
  const updateViewport = useCallback(
    (_, viewport) => setZoom(viewport.zoom),
    []
  );
  const fitMap = useCallback(
    () => flowRef.current?.fitView({ padding: 0.15, duration: 500 }),
    []
  );
  const focusIsland = useCallback(
    (id) => {
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
        { selected, pinned, showAll, filter },
        { openIsland, togglePin }
      ),
    [selected, pinned, showAll, filter, openIsland, togglePin]
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
