import { ChevronRight } from "lucide-react";
import { compact, number } from "../../utils/format";
import { PlayerIdentity } from "../shared/PlayerIdentity";
import styles from "./Leaderboard.module.css";
import type { LeaderboardPlayer } from "../../types";

export interface LeaderboardProps {
  players: LeaderboardPlayer[];
  onFocusIsland: (id: string) => void;
}

export function Leaderboard({ players, onFocusIsland }: LeaderboardProps) {
  return (
    <div className={`${styles.detail} ${styles.ranking}`}>
      <div className={styles.eyebrow}>TOÀN CHIẾN TRƯỜNG</div>
      <h2>Bảng xếp hạng</h2>
      <p>Tổng điểm mẫu trên tất cả cứ điểm.</p>
      {players.map((player, index) => (
        <details key={player.id} className={styles.item}>
          <summary className={styles.summary}>
            <span className={styles.rank}>{index + 1}</span>
            <PlayerIdentity
              player={player}
              faction={player.factionInfo}
              nodeCount={player.nodes}
            />
            <b>{compact(player.score)}</b>
            <ChevronRight size={13} />
          </summary>
          <div className={styles.allocation}>
            {player.allocations.map((entry) => (
              <button
                key={entry.nodeId}
                onClick={() => onFocusIsland(entry.nodeId)}
              >
                <span>Đảo {entry.nodeId}</span>
                <b>{number(entry.score)}</b>
              </button>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
