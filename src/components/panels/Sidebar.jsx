import { Compass, Flag, RotateCcw, Trophy } from "lucide-react";
import { NodeDetails } from "./NodeDetails.jsx";
import { Leaderboard } from "./Leaderboard.jsx";

export function Sidebar({
  tab,
  details,
  pinned,
  leaderboard,
  onTabChange,
  onCloseIsland,
  onTogglePin,
  onFocusIsland,
  onClearPins,
}) {
  return (
    <aside>
      <div className="aside-tabs">
        <button
          className={tab === "node" ? "selected" : ""}
          onClick={() => onTabChange("node")}
        >
          <Flag size={15} /> Cứ điểm
        </button>
        <button
          className={tab === "ranking" ? "selected" : ""}
          onClick={() => onTabChange("ranking")}
        >
          <Trophy size={15} /> Xếp hạng
        </button>
      </div>
      {tab === "ranking" ? (
        <Leaderboard players={leaderboard} onFocusIsland={onFocusIsland} />
      ) : details ? (
        <NodeDetails
          details={details}
          pinned={pinned}
          onClose={onCloseIsland}
          onTogglePin={onTogglePin}
        />
      ) : (
        <div className="empty">
          <Compass size={40} />
          <h2>Khám phá chiến trường</h2>
          <p>Chọn một đảo trên map để xem điểm các phe và người chơi.</p>
        </div>
      )}
      <div className="aside-foot">
        <span>
          <i /> Dữ liệu minh họa
        </span>
        <button
          title="Bỏ tất cả ghim"
          aria-label="Bỏ tất cả ghim"
          onClick={onClearPins}
        >
          <RotateCcw size={14} />
        </button>
        <small>Điểm tổng được tính từ đóng góp tại từng đảo.</small>
      </div>
    </aside>
  );
}
