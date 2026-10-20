import styles from "./MapHeading.module.css";

export interface MapHeadingProps {
  islandCount: number;
  baseCount: number;
}

export function MapHeading({ islandCount, baseCount }: MapHeadingProps) {
  return (
    <div className={styles.mapHeading}>
      <div>
        <div className={styles.eyebrow}>CHIẾN TRƯỜNG / TỔNG QUAN</div>
        <h1 className={styles.title}>
          Đại hải trình<span>01</span>
        </h1>
      </div>
      <div className={styles.mapCount}>
        <b>{islandCount}</b> cứ điểm <span>·</span> <b>{baseCount}</b> căn cứ
      </div>
    </div>
  );
}
