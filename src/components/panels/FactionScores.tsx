import { number } from "../../utils/format";
import type { FactionScore } from "../../types";

export interface FactionScoresProps {
  scores: FactionScore[];
  total: number;
}

export function FactionScores({ scores, total }: FactionScoresProps) {
  return (
    <div className="faction-scores">
      {scores.map((faction) => (
        <div key={faction.id}>
          <div>
            <span>
              <i style={{ background: faction.color }} />
              {faction.name}
            </span>
            <b>{number(faction.score)}</b>
          </div>
          <div className="bar-track">
            <div
              style={{
                width: `${total ? (faction.score / total) * 100 : 0}%`,
                background: faction.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
