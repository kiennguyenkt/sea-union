// Pure queries: no React, UI state, or dependency on the demo fixture.
export function scoresForNode(nodeId, contributions, factions) {
  const totals = new Map();
  for (const entry of contributions) {
    if (entry.nodeId === nodeId) {
      totals.set(entry.faction, (totals.get(entry.faction) ?? 0) + entry.score);
    }
  }
  return factions.map((faction) => ({
    ...faction,
    score: totals.get(faction.id) ?? 0,
  }));
}

export function playerAllocations(playerId, contributions) {
  return contributions
    .filter((entry) => entry.playerId === playerId)
    .sort((a, b) => b.score - a.score);
}

export function buildLeaderboard(players, contributions, factions) {
  return players
    .map((player) => {
      const allocations = playerAllocations(player.id, contributions);
      return {
        ...player,
        factionInfo: factions.find((faction) => faction.id === player.faction),
        score: allocations.reduce((total, entry) => total + entry.score, 0),
        nodes: allocations.length,
        allocations,
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function nodeDetails(nodeId, islands, contributions, players, factions) {
  const island = islands.find((node) => node.id === nodeId);
  if (!island) return null;
  const scores = scoresForNode(nodeId, contributions, factions);
  const attackers = contributions
    .filter((entry) => entry.nodeId === nodeId)
    .sort((a, b) => b.score - a.score)
    .map((entry) => ({
      ...entry,
      player: players.find((player) => player.id === entry.playerId),
      factionInfo: factions.find((faction) => faction.id === entry.faction),
    }));
  return {
    island,
    owner: factions.find((faction) => faction.id === island.owner),
    scores,
    total: scores.reduce((sum, faction) => sum + faction.score, 0),
    attackers,
  };
}

export function searchIslands(query, islands, limit = 6) {
  const normalized = query.trim().toLocaleLowerCase("vi");
  if (!normalized) return [];
  return islands
    .filter((node) =>
      `${node.id} ${node.name}`.toLocaleLowerCase("vi").includes(normalized)
    )
    .slice(0, limit);
}
