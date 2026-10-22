import styles from "./MapHeading.module.css";

export interface MapHeadingProps {
  islandCount: number;
  baseCount: number;
  debug: boolean;
  onToggleDebug: () => void;
}

export function MapHeading({
  islandCount,
  baseCount,
  debug,
  onToggleDebug,
}: MapHeadingProps) {
  return (
    <div className={styles.mapHeading}>
      <div>
        <div className={styles.eyebrow}>CHIẾN TRƯỜNG / TỔNG QUAN</div>
        <h1 className={styles.title}>
          Đại hải trình<span>01</span>
        </h1>
      </div>
      <div className={styles.headingMeta}>
        {/* Debug chỉ dành cho dev — Vite thay import.meta.env.DEV bằng false khi
            build, nên nút (và overlay tâm node) bị loại khỏi bundle prod. */}
        {import.meta.env.DEV && (
          <button
            className={`${styles.debugToggle} ${debug ? styles.debugOn : ""}`}
            onClick={onToggleDebug}
            aria-pressed={debug}
            title="Hiện tâm node + đường dash ngang qua node 4 và đường dọc qua các cứ điểm trục giữa"
          >
            Debug tâm node
          </button>
        )}
        <div className={styles.mapCount}>
          <b>{islandCount}</b> cứ điểm <span>·</span> <b>{baseCount}</b> căn cứ
        </div>
      </div>
    </div>
  );
}
