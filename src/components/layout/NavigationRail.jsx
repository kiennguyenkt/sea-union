import { Map, Trophy, Compass } from "lucide-react";

export function NavigationRail({ onFitMap, onShowRanking }) {
  return (
    <nav className="rail">
      <button
        className="rail-active"
        title="Bản đồ"
        aria-label="Bản đồ"
        onClick={onFitMap}
      >
        <Map />
      </button>
      <button
        title="Bảng xếp hạng"
        aria-label="Bảng xếp hạng"
        onClick={onShowRanking}
      >
        <Trophy />
      </button>
      <div className="rail-bottom">
        <Compass size={22} />
      </div>
    </nav>
  );
}
