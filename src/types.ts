import type { Node } from "@xyflow/react";

export interface Position {
  x: number;
  y: number;
}

export interface Faction {
  id: string;
  name: string;
  short?: string;
  color: string;
  direction?: string;
}

export interface FactionScore extends Faction {
  score: number;
}

export interface LayoutNode {
  id: string;
  name: string;
  position: Position;
  tier?: number;
  central?: boolean;
  base?: boolean;
  owner?: string | null;
  indexPending?: boolean;
}

export interface Island extends LayoutNode {
  owner: string | null;
  boss: string | null;
  level: number;
}

export interface Route {
  source: string;
  target: string;
}

export interface Player {
  id: string;
  name: string;
  faction: string;
}

export interface Contribution {
  nodeId: string;
  playerId: string;
  faction: string;
  score: number;
}

export interface LeaderboardPlayer extends Player {
  factionInfo?: Faction;
  score: number;
  nodes: number;
  allocations: Contribution[];
}

export interface Attacker extends Contribution {
  player?: Player;
  factionInfo?: Faction;
}

export interface NodeDetailData {
  island: Island;
  owner?: Faction;
  scores: FactionScore[];
  total: number;
  attackers: Attacker[];
}

export type IslandNodeData = Island & {
  factionInfo?: Faction;
  scores?: FactionScore[];
  pinned: boolean;
  showAll: boolean;
  active: boolean;
  dim: boolean;
  open: (id: string) => void;
  pin: (id: string) => void;
  [key: string]: unknown;
};

export type AppNode = Node<IslandNodeData, "island">;
