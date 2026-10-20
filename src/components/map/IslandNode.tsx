import { useState } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Anchor, Castle, Pin } from "lucide-react";
import { NodeStats } from "./NodeStats";
import type { AppNode } from "../../types";

export function IslandNode({ data }: NodeProps<AppNode>) {
  const [hovered, setHovered] = useState(false);
  const Icon = data.base || data.central ? Castle : Anchor;
  const direction = data.base
    ? data.factionInfo?.direction
    : data.id === "4"
      ? "TRUNG TÂM"
      : "";
  const className = [
    "island",
    data.base && "base",
    data.central && "central",
    data.active && "active",
    data.dim && "dim",
  ]
    .filter(Boolean)
    .join(" ");
  const showStats = !data.base && (data.showAll || data.pinned || hovered);

  return (
    <div
      className={className}
      style={
        {
          "--faction": data.factionInfo?.color || "#97acbb",
        } as React.CSSProperties
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Handle
        type="target"
        position={Position.Top}
        id="in"
        isConnectable={false}
      />
      <button
        className="island-icon nodrag"
        onClick={() => data.open(data.id)}
        aria-label={`Xem ${data.id} ${data.name}`}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <Icon size={data.base ? 31 : 24} />
      </button>
      <div className="island-label">
        <span>{data.id}</span> {direction}
        <button
          className={`pin nodrag ${data.pinned ? "pinned" : ""}`}
          aria-label={`${data.pinned ? "Bỏ ghim" : "Ghim"} ${data.id}`}
          aria-pressed={data.pinned}
          onClick={() => data.pin(data.id)}
        >
          <Pin size={13} />
        </button>
      </div>
      {data.base && <div className="base-note">BASE · BẤT KHẢ CHIẾM</div>}
      {showStats && <NodeStats name={data.name} scores={data.scores} />}
      <Handle
        type="source"
        position={Position.Bottom}
        id="out"
        isConnectable={false}
      />
    </div>
  );
}
