import { Map, Trophy, Compass } from "lucide-react";
import styles from "./NavigationRail.module.css";

export interface NavigationRailProps {
  onFitMap: () => void;
  onShowRanking: () => void;
}

export function NavigationRail({
  onFitMap,
  onShowRanking,
}: NavigationRailProps) {
  return (
    <nav className={styles.rail}>
      <button
        className={styles.railActive}
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
      <div className={styles.railBottom}>
        <Compass size={22} />
      </div>
    </nav>
  );
}
