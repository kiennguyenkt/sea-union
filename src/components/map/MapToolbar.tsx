import { Search, Layers, Crosshair } from "lucide-react";
import type { Island } from "../../types";

export interface MapToolbarProps {
  query: string;
  matches: Island[];
  showAll: boolean;
  onQueryChange: (query: string) => void;
  onFocusIsland: (id: string) => void;
  onShowAllChange: (showAll: boolean) => void;
  onFitMap: () => void;
}

export function MapToolbar({
  query,
  matches,
  showAll,
  onQueryChange,
  onFocusIsland,
  onShowAllChange,
  onFitMap,
}: MapToolbarProps) {
  return (
    <div className="toolbar">
      <div className="search">
        <Search size={16} />
        <input
          aria-label="Tìm đảo"
          placeholder="Tìm số đảo hoặc tên…"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
        {matches.length > 0 && (
          <div className="search-results">
            {matches.map((island) => (
              <button key={island.id} onClick={() => onFocusIsland(island.id)}>
                {island.id}
                <span>{island.name}</span>
              </button>
            ))}
          </div>
        )}
        {query && !matches.length && (
          <div className="search-results empty-result">Không tìm thấy đảo</div>
        )}
      </div>
      <label className="show-all">
        <Layers size={16} /> Điểm toàn map
        <input
          type="checkbox"
          checked={showAll}
          onChange={(event) => onShowAllChange(event.target.checked)}
        />
        <span className="switch" />
      </label>
      <button className="fit" onClick={onFitMap}>
        <Crosshair size={16} /> Toàn cảnh
      </button>
    </div>
  );
}
