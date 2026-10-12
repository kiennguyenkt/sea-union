import { compact } from "../../utils/format.js";

export function NodeStats({ name, scores }) {
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
