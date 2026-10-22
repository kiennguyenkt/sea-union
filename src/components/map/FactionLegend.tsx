import styles from "./FactionLegend.module.css";
import type { Faction } from "../../types";

export interface FactionLegendProps {
  factions: Faction[];
  filter: string;
  onSelectFaction: (id: string) => void;
}

export function FactionLegend({
  factions,
  filter,
  onSelectFaction,
}: FactionLegendProps) {
  return (
    <footer className={styles.legend}>
      <button
        className={filter === "all" ? styles.chosen : ""}
        onClick={() => onSelectFaction("all")}
      >
        Tất cả
      </button>
      {factions.map((faction) => (
        <button
          key={faction.id}
          className={filter === faction.id ? styles.chosen : ""}
          onClick={() => onSelectFaction(faction.id)}
        >
          <i style={{ background: faction.color }} />
          {faction.name}
        </button>
      ))}
      <button
        className={`${styles.neutral} ${filter === "neutral" ? styles.chosen : ""}`}
        onClick={() => onSelectFaction("neutral")}
      >
        <i />
        Trung lập
      </button>
      <span className={styles.legendHelp}>Kéo để di chuyển · Cuộn để zoom</span>
    </footer>
  );
}
