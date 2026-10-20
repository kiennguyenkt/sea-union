import {
  ReactFlow,
  Background,
  Controls,
  type Edge,
  type ReactFlowInstance,
  type Viewport,
} from "@xyflow/react";
import { mapBounds } from "../../data/map-layout";
import { IslandNode } from "./IslandNode";
import { RouteEdge } from "./RouteEdge";
import styles from "./MapCanvas.module.css";
import type { AppNode } from "../../types";

const nodeTypes = { island: IslandNode };
const edgeTypes = { route: RouteEdge };

export interface MapCanvasProps {
  nodes: AppNode[];
  edges: Edge[];
  zoom: number;
  onInit: (instance: ReactFlowInstance<AppNode, Edge>) => void;
  onMove: (event: unknown, viewport: Viewport) => void;
}

export function MapCanvas({
  nodes,
  edges,
  zoom,
  onInit,
  onMove,
}: MapCanvasProps) {
  return (
    <div className={styles.mapCanvas}>
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
      <div className={styles.zoomLabel}>{Math.round(zoom * 100)}%</div>
    </div>
  );
}
