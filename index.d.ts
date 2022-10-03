declare module 'ngraph.fromjson' {
  import { Graph, NodeId } from 'ngraph.graph';
  import { EventedType } from 'ngraph.events';

  export interface JsonLink<Data = any> {
    fromId: NodeId;
    toId: NodeId;
    data?: Data;
  }

  export interface JsonNode<Data = any> {
    id: NodeId;
    data?: Data;
  }

  export interface JsonGraph<Node = JsonNode<any>, Link = JsonLink<any>> {
    nodes: Node[];
    links: Link[];
  }

  export default function load<NodeData = any, LinkData = any, Node = JsonNode<NodeData>, Link = JsonLink<LinkData>>(
    jsonGraph: JsonGraph<JsonNode<NodeData> | Node, JsonLink<LinkData> | Link> | string,
    nodeTransform?: (node: Node) => JsonNode<NodeData>,
    linkTransform?: (link: Link) => JsonLink<LinkData>,
    options?: { multigraph: boolean }
  ): Graph<NodeData, LinkData> & EventedType;
}
