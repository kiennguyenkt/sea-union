import { compact } from "../../utils/format";
import type { FactionScore } from "../../types";

export interface NodeStatsProps {
  name: string;
  scores?: FactionScore[];
}

export function NodeStats({ name, scores }: NodeStatsProps) {
  if (!scores) return null;
  return (
    <div className="node-stats">
      <div className="stat-title">{name}</div>
      {scores.map((faction) => (
        <div key={faction.id}>
          <span>
            <i style={{ background: faction.color }} />
            {faction.short}
          </span>
          <b>{compact(faction.score)}</b>
        </div>
      ))}
    </div>
  );
}
