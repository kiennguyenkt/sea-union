// Ownership, boss and contributions are demo data, separate from screenshot layout.
import { layoutNodes, layoutRoutes } from "./map-layout.js";
import { factions } from "./factions.js";

const playerNames = [
  "Mây",
  "Akira",
  "Kaito",
  "Sanji",
  "Luffy",
  "Nami",
  "Zoro",
  "Robin",
  "Ace",
  "Law",
  "Sabo",
  "Jinbe",
];
export const players = playerNames.map((name, index) => ({
  id: `p${index}`,
  name,
  faction: factions[index % 4].id,
}));
export const islands = layoutNodes.map((node, index) => {
  const { x, y } = node.position;
  const home =
    Math.abs(x) > Math.abs(y)
      ? x < 0
        ? "west"
        : "east"
      : y < 0
        ? "north"
        : "south";
  return {
    ...node,
    owner: node.base
      ? node.owner
      : index % 7 === 0 || node.central
        ? null
        : home,
    boss: node.base
      ? null
      : ["Vệ binh biển", "Thuyền trưởng", "Hải vương"][index % 3],
    level: node.central ? 100 : node.tier === 1 ? 35 : 60,
  };
});
export const routes = layoutRoutes;
export const contributions = islands
  .filter((n) => !n.base)
  .flatMap((node, index) =>
    players
      .map((player, p) => ({
        nodeId: node.id,
        playerId: player.id,
        faction: player.faction,
        score: (((index * 17 + p * 11) % 9) + 1) * 1250,
      }))
      .filter((_, p) => (index + p) % 3 !== 0)
  );
