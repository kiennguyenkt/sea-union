import { Anchor } from "lucide-react";
import styles from "./AppHeader.module.css";

export function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.brandIcon}>
          <Anchor size={25} />
        </div>
        <div>
          SEA UNION<small>TACTICAL ATLAS</small>
        </div>
      </div>
      <div className={styles.divider} />
      <span className={styles.title}>Bản đồ chiến thuật</span>
      <div className={styles.right}>
        <span className={styles.demoBadge}>
          <i /> DEMO / DỮ LIỆU MẪU
        </span>
        <span className={styles.version}>PHASE 01</span>
      </div>
    </header>
  );
}
