import { Search, Layers, Crosshair } from "lucide-react";
import styles from "./MapToolbar.module.css";
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
    <div className={styles.toolbar}>
      <div className={styles.search}>
        <Search size={16} />
        <input
          aria-label="Tìm đảo"
          placeholder="Tìm số đảo hoặc tên…"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
        {matches.length > 0 && (
          <div className={styles.searchResults}>
            {matches.map((island) => (
              <button key={island.id} onClick={() => onFocusIsland(island.id)}>
                {island.id}
                <span>{island.name}</span>
              </button>
            ))}
          </div>
        )}
        {query && !matches.length && (
          <div className={`${styles.searchResults} ${styles.emptyResult}`}>
            Không tìm thấy đảo
          </div>
        )}
      </div>
      <label className={styles.showAll}>
        <Layers size={16} /> Điểm toàn map
        <input
          type="checkbox"
          checked={showAll}
          onChange={(event) => onShowAllChange(event.target.checked)}
        />
        <span className={styles.switch} />
      </label>
      <button className={styles.fit} onClick={onFitMap}>
        <Crosshair size={16} /> Toàn cảnh
      </button>
    </div>
  );
}
