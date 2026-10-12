import { useTacticalMap } from "./hooks/useTacticalMap.js";
import { AppHeader } from "./components/layout/AppHeader.jsx";
import { NavigationRail } from "./components/layout/NavigationRail.jsx";
import { MapHeading } from "./components/map/MapHeading.jsx";
import { MapToolbar } from "./components/map/MapToolbar.jsx";
import { MapCanvas } from "./components/map/MapCanvas.jsx";
import { FactionLegend } from "./components/map/FactionLegend.jsx";
import { Sidebar } from "./components/panels/Sidebar.jsx";

export function App() {
  const map = useTacticalMap();
  const { actions } = map;
  return (
    <div className="app">
      <AppHeader />
      <div className="workspace">
        <NavigationRail
          onFitMap={actions.fitMap}
          onShowRanking={() => actions.setTab("ranking")}
        />
        <main>
          <MapHeading islandCount={map.islandCount} baseCount={map.baseCount} />
          <MapToolbar
            query={map.query}
            matches={map.matches}
            showAll={map.showAll}
            onQueryChange={actions.setQuery}
            onFocusIsland={actions.focusIsland}
            onShowAllChange={actions.setShowAll}
            onFitMap={actions.fitMap}
          />
          <MapCanvas
            nodes={map.nodes}
            edges={map.edges}
            zoom={map.zoom}
            onInit={actions.initializeFlow}
            onMove={actions.updateViewport}
          />
          <FactionLegend
            factions={map.factions}
            filter={map.filter}
            onSelectFaction={actions.selectFaction}
          />
        </main>
        <Sidebar
          tab={map.tab}
          details={map.details}
          pinned={map.pinned.has(map.details?.island.id)}
          leaderboard={map.leaderboard}
          onTabChange={actions.setTab}
          onCloseIsland={actions.closeIsland}
          onTogglePin={actions.togglePin}
          onFocusIsland={actions.focusIsland}
          onClearPins={actions.clearPins}
        />
      </div>
    </div>
  );
}
