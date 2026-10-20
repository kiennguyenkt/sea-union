import { Map, Trophy, Compass } from "lucide-react";

export interface NavigationRailProps {
  onFitMap: () => void;
  onShowRanking: () => void;
}

export function NavigationRail({
  onFitMap,
  onShowRanking,
}: NavigationRailProps) {
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
