import { ChevronRight } from "lucide-react";
import { compact, number } from "../../utils/format.js";
import { PlayerIdentity } from "../shared/PlayerIdentity.jsx";

export function Leaderboard({ players, onFocusIsland }) {
  return (
    <div className="detail ranking">
      <div className="eyebrow">TOÀN CHIẾN TRƯỜNG</div>
      <h2>Bảng xếp hạng</h2>
      <p>Tổng điểm mẫu trên tất cả cứ điểm.</p>
      {players.map((player, index) => (
        <details key={player.id}>
          <summary>
            <span className="rank">{index + 1}</span>
            <PlayerIdentity
              player={player}
              faction={player.factionInfo}
              nodeCount={player.nodes}
            />
            <b>{compact(player.score)}</b>
            <ChevronRight size={13} />
          </summary>
          <div className="allocation">
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
