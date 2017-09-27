import { INodeContent, IServerNode } from '../models/NodeContent';

export const parseFetchedNodes = (nodes: Array<IServerNode>): Array<INodeContent> => nodes.map(({id, text}) => ({id, text}));
