import test from "node:test";
import assert from "node:assert/strict";
import {
  buildLeaderboard,
  nodeDetails,
  scoresForNode,
  searchIslands,
} from "./selectors.js";
import { buildMapEdges, buildMapNodes } from "./mapGraph.js";

const factions = [
  { id: "a", name: "A", color: "#123456" },
  { id: "b", name: "B", color: "#abcdef" },
];
const islands = [
  { id: "1-1", name: "Đảo Gió", position: { x: 0, y: 0 }, owner: "a" },
  { id: "2-1", name: "Đảo Biển", position: { x: 50, y: 50 }, owner: "b" },
];
const players = [
  { id: "p1", name: "One", faction: "a" },
  { id: "p2", name: "Two", faction: "b" },
];
const contributions = [
  { nodeId: "1-1", playerId: "p1", faction: "a", score: 100 },
  { nodeId: "2-1", playerId: "p1", faction: "a", score: 300 },
  { nodeId: "1-1", playerId: "p2", faction: "b", score: 200 },
];

test("Queries prepare detail and allocation data without mutating the source", () => {
  const original = structuredClone(contributions);
  const details = nodeDetails("1-1", islands, contributions, players, factions);
  assert.equal(details.total, 300);
  assert.equal(details.attackers[0].player.name, "Two");
  assert.equal(details.attackers[0].factionInfo.id, "b");
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
  assert.deepEqual(contributions, original);
});

test("Search handles whitespace, casing, indexes, empty queries and result limits", () => {
  assert.equal(searchIslands("  ĐẢO GIÓ  ", islands)[0].id, "1-1");
  assert.equal(searchIslands("2-1", islands)[0].id, "2-1");
  assert.deepEqual(searchIslands("   ", islands), []);
  assert.deepEqual(searchIslands("missing", islands), []);
  assert.equal(searchIslands("Đảo", islands, 1).length, 1);
});

test("Map projection keeps pinning independent from global stats and filtering", () => {
  const scores = new Map(
    islands.map((n) => [n.id, scoresForNode(n.id, contributions, factions)])
  );
  const pinned = new Set(["1-1"]);
  const actions = { openIsland() {}, togglePin() {} };
  const state = { selected: "2-1", pinned, showAll: false, filter: "a" };
  const nodes = buildMapNodes(islands, scores, factions, state, actions);
  assert.equal(nodes[0].data.pinned, true);
  assert.equal(nodes[0].data.showAll, false);
  assert.equal(nodes[1].data.dim, true);
  assert.equal(nodes[1].data.active, true);
  assert.equal(nodes[0].data.open, actions.openIsland);
  const globalNodes = buildMapNodes(
    islands,
    scores,
    factions,
    { ...state, showAll: true },
    actions
  );
  assert.equal(globalNodes[1].data.showAll, true);
  assert.equal(globalNodes[1].data.pinned, false);
  assert.deepEqual([...pinned], ["1-1"]);
  assert.equal(nodes[0].position, islands[0].position);
  const edges = buildMapEdges(
    [{ id: "route", source: "1-1", target: "2-1" }],
    islands,
    factions
  );
  assert.equal(edges[0].style.stroke, "#5d7a8a");
});
