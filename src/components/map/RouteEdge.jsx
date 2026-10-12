import { BaseEdge, getStraightPath } from "@xyflow/react";

export function RouteEdge(props) {
  const [path] = getStraightPath(props);
  return <BaseEdge path={path} style={props.style} />;
}
