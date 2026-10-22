import { Map, Trophy, Compass } from "lucide-react";
import { useFitMap } from "../../hooks/useFitMap";
import styles from "./NavigationRail.module.css";

export interface NavigationRailProps {
  onShowRanking: () => void;
}

export function NavigationRail({ onShowRanking }: NavigationRailProps) {
  const fitMap = useFitMap();
  return (
    <nav className={styles.rail}>
      <button
        className={styles.railActive}
        title="Bản đồ"
        aria-label="Bản đồ"
        onClick={fitMap}
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
