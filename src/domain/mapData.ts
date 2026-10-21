import { islands, routes, contributions, players } from "../data/demo";
import { factions } from "../data/factions";
import { buildLeaderboard, scoresForNode } from "./selectors";
import { buildMapEdges } from "./mapGraph";
import type { FactionScore } from "../types";

export const scoresByNode = new Map<string, FactionScore[]>(
  islands.map((node) => [
    node.id,
    scoresForNode(node.id, contributions, factions),
  ])
);
export const mapEdges = buildMapEdges(routes, islands, factions);
export const leaderboard = buildLeaderboard(players, contributions, factions);
export const baseCount = islands.filter((node) => node.base).length;
