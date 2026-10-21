// Translate domain data to React Flow models without rendering components.
import type { Edge } from "@xyflow/react";
import type { AppNode, Faction, FactionScore, Island, Route } from "../types";

export interface MapGraphState {
  selected: string | null;
  pinned: Set<string>;
  showAll: boolean;
  filter: string;
  debug?: boolean;
}

export interface MapGraphActions {
  openIsland: (id: string) => void;
  togglePin: (id: string) => void;
}

export function buildMapNodes(
  islands: Island[],
  scoresByNode: Map<string, FactionScore[]>,
  factions: Faction[],
  state: MapGraphState,
  actions: MapGraphActions
): AppNode[] {
  return islands.map((island) => ({
    id: island.id,
    type: "island" as const,
    position: island.position,
    zIndex:
      state.showAll || state.pinned.has(island.id)
        ? 10
        : island.id === state.selected
          ? 5
          : 1,
    data: {
      ...island,
      factionInfo: factions.find((faction) => faction.id === island.owner),
      scores: scoresByNode.get(island.id),
      pinned: state.pinned.has(island.id),
      showAll: state.showAll,
      active: island.id === state.selected,
      dim: state.filter !== "all" && island.owner !== state.filter,
      debug: state.debug,
      open: actions.openIsland,
      pin: actions.togglePin,
    },
  }));
}

export function buildMapEdges(
  routes: Route[],
  islands: Island[],
  factions: Faction[]
): Edge[] {
  const byId = new Map(islands.map((island) => [island.id, island]));
  return routes.map((route) => {
    const source = byId.get(route.source);
    const target = byId.get(route.target);
    const faction =
      source?.owner && source.owner === target?.owner
        ? factions.find((entry) => entry.id === source.owner)
        : null;
    return {
      ...route,
      id: `${route.source}__${route.target}`,
      sourceHandle: "out",
      targetHandle: "in",
      type: "route",
      selectable: false,
      style: {
        stroke: faction?.color ?? "#5d7a8a",
        strokeWidth: 2,
        opacity: 0.45,
      },
    };
  });
}
