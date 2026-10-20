import { number } from "../../utils/format";
import { PlayerIdentity } from "../shared/PlayerIdentity";
import type { Attacker } from "../../types";

export interface PlayerTableProps {
  attackers: Attacker[];
}

export function PlayerTable({ attackers }: PlayerTableProps) {
  return (
    <div className="player-table">
      <div className="table-head">
        <span>NGƯỜI CHƠI / PHE</span>
        <span>ĐIỂM</span>
      </div>
      {attackers.map((entry, index) => (
        <div className="player-row" key={entry.playerId}>
          <span className="rank">{String(index + 1).padStart(2, "0")}</span>
          <PlayerIdentity player={entry.player} faction={entry.factionInfo} />
          <b>{number(entry.score)}</b>
        </div>
      ))}
    </div>
  );
}
