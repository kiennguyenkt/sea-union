import { Anchor, Castle, Pin, Shield, X } from "lucide-react";
import { number } from "../../utils/format.js";
import { FactionScores } from "./FactionScores.jsx";
import { PlayerTable } from "./PlayerTable.jsx";

export function NodeDetails({ details, pinned, onClose, onTogglePin }) {
  const { island, owner, scores, total, attackers } = details;
  return (
    <div className="detail">
      <div className="detail-top">
        <span className="eyebrow">THÔNG TIN CỨ ĐIỂM</span>
        <button aria-label="Đóng chi tiết" onClick={onClose}>
          <X size={17} />
        </button>
      </div>
      <div className="detail-icon" style={{ color: owner?.color || "#b8c6cf" }}>
        {island.base ? <Castle size={33} /> : <Anchor size={33} />}
      </div>
      <h2>{island.name}</h2>
      <div className="detail-tags">
        <span>#{island.id}</span>
        <span style={{ color: owner?.color }}>
          {owner?.name || "Trung lập"}
        </span>
      </div>
      <div className="boss">
        <Shield size={19} />
        <div>
          <small>{island.base ? "CĂN CỨ PHE" : "BOSS CỨ ĐIỂM"}</small>
          <b>{island.base ? "Không thể bị chiếm" : island.boss}</b>
        </div>
        {!island.base && <span>Lv. {island.level}</span>}
      </div>
      {!island.base && (
        <>
          <div className="section-title">
            Điểm các phe<span>{number(total)} tổng</span>
          </div>
          <FactionScores scores={scores} total={total} />
          <div className="section-title">
            Người chơi tấn công<span>{attackers.length} người</span>
          </div>
          <PlayerTable attackers={attackers} />
        </>
      )}
      <button
        className={`pin-detail ${pinned ? "is-pinned" : ""}`}
        onClick={() => onTogglePin(island.id)}
      >
        <Pin size={15} />
        {pinned ? "Bỏ ghim điểm trên map" : "Ghim điểm trên map"}
      </button>
    </div>
  );
}
