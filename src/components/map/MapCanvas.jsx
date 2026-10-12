import { ReactFlow, Background, Controls, MiniMap } from "@xyflow/react";
import { Compass } from "lucide-react";
import { IslandNode } from "./IslandNode.jsx";
import { RouteEdge } from "./RouteEdge.jsx";

const nodeTypes = { island: IslandNode };
const edgeTypes = { route: RouteEdge };
const miniMapColor = (node) => node.data.factionInfo?.color || "#90a4b3";

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
        minZoom={0.1}
        maxZoom={2}
        nodesDraggable={false}
        nodesConnectable={false}
        edgesReconnectable={false}
        elementsSelectable={false}
        deleteKeyCode={null}
        onInit={onInit}
        onMove={onMove}
        colorMode="dark"
      >
        <Background color="#345061" gap={40} size={1} />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={miniMapColor}
          maskColor="rgba(7,20,30,.7)"
          pannable
          zoomable
        />
      </ReactFlow>
      <div className="map-watermark">
        <Compass size={38} />
        <span>N</span>
      </div>
      <div className="map-caption">
        <span className="live-dot" /> MAP THEO ẢNH GAME
        <small>Index theo ảnh · điểm & phe là dữ liệu mẫu</small>
      </div>
      <div className="zoom-label">{Math.round(zoom * 100)}%</div>
    </div>
  );
}
