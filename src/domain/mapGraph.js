// Translate domain data to React Flow models without rendering components.
export function buildMapNodes(islands, scoresByNode, factions, state, actions) {
  return islands.map((island) => ({
    id: island.id,
    type: "island",
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
      open: actions.openIsland,
      pin: actions.togglePin,
    },
  }));
}

export function buildMapEdges(routes, islands, factions) {
  const byId = new Map(islands.map((island) => [island.id, island]));
  return routes.map((route) => {
    const source = byId.get(route.source);
    const target = byId.get(route.target);
    const faction =
      source.owner && source.owner === target.owner
        ? factions.find((entry) => entry.id === source.owner)
        : null;
    return {
      ...route,
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
