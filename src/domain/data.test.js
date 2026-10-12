import test from "node:test";
import assert from "node:assert/strict";
import { islands, routes, contributions, players } from "../data/demo.js";
import { factions } from "../data/factions.js";
import {
  buildLeaderboard,
  scoresForNode as computeScores,
} from "./selectors.js";

const leaderboard = buildLeaderboard(players, contributions, factions);
const scoresForNode = (id) => computeScores(id, contributions, factions);
test("Map has unique nodes, four unclaimable bases, and valid routes", () => {
  const ids = new Set(islands.map((n) => n.id));
  assert.equal(ids.size, islands.length);
  assert.equal(islands.filter((n) => n.base).length, 4);
  assert.equal(islands.length, 89);
  for (let index = 1; index <= 24; index++) assert.ok(ids.has(`1-${index}`));
  for (let index = 1; index <= 52; index++) assert.ok(ids.has(`2-${index}`));
  for (const n of islands)
    assert.match(
      n.id,
      /^(?:base-(?:north|east|south|west)|[34]|[123]-\d{1,2})$/,
    );
  for (const r of routes) {
    assert.ok(ids.has(r.source));
    assert.ok(ids.has(r.target));
    assert.notEqual(r.source, r.target);
  }
  const visited = new Set([islands[0].id]);
  for (let i = 0; i < islands.length; i++)
    for (const r of routes) {
      if (visited.has(r.source)) visited.add(r.target);
      if (visited.has(r.target)) visited.add(r.source);
    }
  assert.equal(visited.size, islands.length);
});
test("Screenshot landmarks use the central axis and matching opposite sectors", () => {
  const at = (id) => islands.find((n) => n.id === id).position;
  assert.deepEqual(at("4"), { x: 0, y: 0 });
  for (const node of islands.filter((n) => n.central))
    assert.equal(node.position.y, 0);
  assert.equal(islands.filter((n) => n.central).length, 9);
  for (const [left, right] of [
    ["1-24", "1-4"],
    ["1-22", "1-15"],
    ["2-32", "2-18"],
    ["2-30", "2-6"],
  ]) {
    assert.equal(at(left).x, -at(right).x);
    assert.equal(at(left).y, at(right).y);
  }
  for (const [a, b] of [
    ["1-24", "2-41"],
    ["2-40", "2-35"],
    ["2-32", "3-7"],
    ["3", "4"],
    ["4", "3-2"],
    ["3-8", "2-18"],
  ]) {
    assert.ok(
      routes.some(
        (r) =>
          (r.source === a && r.target === b) ||
          (r.source === b && r.target === a),
      ),
      `${a} connects to ${b}`,
    );
  }
});
test("Faction scores and leaderboard reconcile with player contributions", () => {
  for (const node of islands)
    for (const f of factions) {
      const expected = contributions
        .filter((c) => c.nodeId === node.id && c.faction === f.id)
        .reduce((sum, c) => sum + c.score, 0);
      assert.equal(
        scoresForNode(node.id).find((s) => s.id === f.id).score,
        expected,
      );
    }
  const boardTotal = leaderboard.reduce((sum, p) => sum + p.score, 0);
  assert.equal(
    boardTotal,
    contributions.reduce((sum, c) => sum + c.score, 0),
  );
  for (const p of leaderboard)
    assert.equal(
      p.score,
      contributions
        .filter((c) => c.playerId === p.id)
        .reduce((sum, c) => sum + c.score, 0),
    );
});
