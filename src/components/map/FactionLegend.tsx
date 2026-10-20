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
    <footer className="legend">
      <button
        className={filter === "all" ? "chosen" : ""}
        onClick={() => onSelectFaction("all")}
      >
        Tất cả
      </button>
      {factions.map((faction) => (
        <button
          key={faction.id}
          className={filter === faction.id ? "chosen" : ""}
          onClick={() => onSelectFaction(faction.id)}
        >
          <i style={{ background: faction.color }} />
          {faction.name}
        </button>
      ))}
      <span className="neutral">
        <i />
        Trung lập
      </span>
      <span className="legend-help">Kéo để di chuyển · Cuộn để zoom</span>
    </footer>
  );
}
