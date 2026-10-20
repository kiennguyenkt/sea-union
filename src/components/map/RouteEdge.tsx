import { BaseEdge, getStraightPath, type EdgeProps } from "@xyflow/react";

export function RouteEdge(props: EdgeProps) {
  const [path] = getStraightPath(props);
  return <BaseEdge path={path} style={props.style} />;
}
