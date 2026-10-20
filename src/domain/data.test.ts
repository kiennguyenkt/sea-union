import test from "node:test";
import assert from "node:assert/strict";
import { islands, routes, contributions, players } from "../data/demo";
import { factions } from "../data/factions";
import { buildLeaderboard, scoresForNode as computeScores } from "./selectors";

const leaderboard = buildLeaderboard(players, contributions, factions);
const scoresForNode = (id: string) =>
  computeScores(id, contributions, factions);
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
      /^(?:base-(?:north|east|south|west)|[34]|[123]-\d{1,2})$/
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
  const at = (id: string) => {
    const found = islands.find((n) => n.id === id);
    if (!found) throw new Error(`Island ${id} not found`);
    return found.position;
  };
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
  assert.equal(at("base-west").y, at("base-east").y);
  assert.equal(at("base-north").x, at("base-south").x);
});
test("Faction scores and leaderboard reconcile with player contributions", () => {
  for (const island of islands.filter((n) => !n.base)) {
    const scores = scoresForNode(island.id);
    for (const faction of factions) {
      const expected = contributions
        .filter((c) => c.nodeId === island.id && c.faction === faction.id)
        .reduce((sum, c) => sum + c.score, 0);
      const actual = scores.find((f) => f.id === faction.id)?.score;
      assert.equal(actual, expected);
    }
  }
  for (const player of players) {
    const expected = contributions
      .filter((c) => c.playerId === player.id)
      .reduce((sum, c) => sum + c.score, 0);
    const entry = leaderboard.find((p) => p.id === player.id);
    assert.equal(entry?.score, expected);
  }
  const totalContributions = contributions.reduce((s, c) => s + c.score, 0);
  const totalLeaderboard = leaderboard.reduce((s, p) => s + p.score, 0);
  assert.equal(totalContributions, totalLeaderboard);
});
