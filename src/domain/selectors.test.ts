import test from "node:test";
import assert from "node:assert/strict";
import {
  buildLeaderboard,
  nodeDetails,
  scoresForNode,
  searchIslands,
} from "./selectors";
import { buildMapEdges, buildMapNodes } from "./mapGraph";
import type { Contribution, Faction, Island, Player } from "../types";

const factions: Faction[] = [
  { id: "a", name: "A", color: "#123456" },
  { id: "b", name: "B", color: "#abcdef" },
];
const islands: Island[] = [
  {
    id: "1-1",
    name: "Đảo Gió",
    position: { x: 0, y: 0 },
    owner: "a",
    boss: null,
    level: 35,
  },
  {
    id: "2-1",
    name: "Đảo Biển",
    position: { x: 50, y: 50 },
    owner: "b",
    boss: null,
    level: 60,
  },
];
const players: Player[] = [
  { id: "p1", name: "One", faction: "a" },
  { id: "p2", name: "Two", faction: "b" },
];
const contributions: Contribution[] = [
  { nodeId: "1-1", playerId: "p1", faction: "a", score: 100 },
  { nodeId: "2-1", playerId: "p1", faction: "a", score: 300 },
  { nodeId: "1-1", playerId: "p2", faction: "b", score: 200 },
];

test("Queries prepare detail and allocation data without mutating the source", () => {
  const details = nodeDetails("1-1", islands, contributions, players, factions);
  assert.ok(details);
  assert.equal(details.total, 300);
  assert.equal(details.attackers[0]?.player?.name, "Two");
  assert.equal(details.attackers[0]?.factionInfo?.id, "b");
  assert.deepEqual(
    scoresForNode("missing", contributions, factions).map((f) => f.score),
    [0, 0]
  );
  assert.equal(
    nodeDetails("missing", islands, contributions, players, factions),
    null
  );
  const board = buildLeaderboard(players, contributions, factions);
  assert.equal(board[0].id, "p1");
  assert.equal(board[0].score, 400);
  assert.equal(board[0].nodes, 2);
  assert.deepEqual(
    board[0].allocations.map((c) => c.nodeId),
    ["2-1", "1-1"]
  );
  assert.equal(board[1].id, "p2");
  assert.equal(board[1].score, 200);
});
test("Search handles whitespace, casing, indexes, empty queries and result limits", () => {
  assert.deepEqual(searchIslands("   ", islands), []);
  assert.equal(searchIslands("đảo", islands).length, 2);
  assert.equal(searchIslands("BIỂN", islands)[0]?.id, "2-1");
  assert.equal(searchIslands("1-1", islands)[0]?.name, "Đảo Gió");
  assert.equal(searchIslands("không có", islands).length, 0);
  assert.equal(searchIslands("đảo", islands, 1).length, 1);
});
test("Map projection keeps pinning independent from global stats and filtering", () => {
  const scoresByNode = new Map([
    ["1-1", scoresForNode("1-1", contributions, factions)],
    ["2-1", scoresForNode("2-1", contributions, factions)],
  ]);
  const nodes = buildMapNodes(
    islands,
    scoresByNode,
    factions,
    {
      selected: "1-1",
      pinned: new Set(["2-1"]),
      showAll: false,
      filter: "a",
    },
    { openIsland: () => {}, togglePin: () => {} }
  );
  const byId = new Map(nodes.map((n) => [n.id, n]));
  assert.equal(byId.get("1-1")?.data.active, true);
  assert.equal(byId.get("1-1")?.data.dim, false);
  assert.equal(byId.get("1-1")?.data.pinned, false);
  assert.equal(byId.get("2-1")?.data.pinned, true);
  assert.equal(byId.get("2-1")?.data.dim, true);
  assert.equal(byId.get("2-1")?.zIndex, 10);
  const edges = buildMapEdges(
    [{ source: "1-1", target: "2-1" }],
    islands,
    factions
  );
  assert.equal(edges[0]?.style?.stroke, "#5d7a8a");
  const sameFactionEdges = buildMapEdges(
    [{ source: "1-1", target: "1-1" }],
    islands,
    factions
  );
  assert.equal(sameFactionEdges[0]?.style?.stroke, "#123456");
});
