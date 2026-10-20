import type { Faction, Player } from "../../types";

export interface PlayerIdentityProps {
  player?: Player;
  faction?: Faction;
  nodeCount?: number;
}

export function PlayerIdentity({
  player,
  faction,
  nodeCount,
}: PlayerIdentityProps) {
  const color = faction?.color || "#97acbb";
  const name = player?.name || "Người chơi";
  const factionName = faction?.name || "Không rõ";

  return (
    <>
      <span className="avatar" style={{ color, background: `${color}18` }}>
        {name[0]}
      </span>
      <div className="player-name">
        {name}
        <small style={{ color }}>
          {factionName}
          {nodeCount !== undefined && ` · ${nodeCount} đảo`}
        </small>
      </div>
    </>
  );
}
