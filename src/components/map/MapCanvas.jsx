import { ReactFlow, Background, Controls } from "@xyflow/react";
import { mapBounds } from "../../data/map-layout.js";
import { IslandNode } from "./IslandNode.jsx";
import { RouteEdge } from "./RouteEdge.jsx";

const nodeTypes = { island: IslandNode };
const edgeTypes = { route: RouteEdge };

export function MapCanvas({ nodes, edges, zoom, onInit, onMove }) {
  return (
    <div className="map-canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodeOrigin={[0.5, 0.5]}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.2}
        maxZoom={2}
        translateExtent={mapBounds}
        nodesDraggable={false}
        nodesConnectable={false}
        edgesReconnectable={false}
        elementsSelectable={false}
        deleteKeyCode={null}
        onInit={onInit}
        onMove={onMove}
        colorMode="light"
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#c7ced3" gap={40} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
      <div className="zoom-label">{Math.round(zoom * 100)}%</div>
    </div>
  );
}
