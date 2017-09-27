import { INodeContent, IServerNode } from '../models/NodeContent';

export const parseFetchedNode = (node: IServerNode): INodeContent => ({id: node.id, text: node.text});

export const parseFetchedNodes = (nodes: Array<IServerNode>): Array<INodeContent> => nodes.map(parseFetchedNode);
