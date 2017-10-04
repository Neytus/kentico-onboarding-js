import { OrderedMap } from 'immutable';

import {
  SAVE_NODE,
  FETCH_NODES_SUCCESS,
  POST_NODE_SUCCESS,
  DELETE_NODE_SUCCESS,
} from '../../actions/actionTypes';
import { INodeContent, NodeContent } from '../../models/NodeContent';
import { IAction } from '../../actions/IAction';

export type INodes = OrderedMap<IdType, NodeContent>;

export const nodesReducer = (state: INodes = OrderedMap<IdType, NodeContent>(), action: IAction): INodes => {
  switch (action.type) {
    case DELETE_NODE_SUCCESS:
      return state.delete(action.payload.id);

    case SAVE_NODE: {
      const newNode = state.get(action.payload.id).with(action.payload);

      return state.set(newNode.id, newNode);
    }

    case FETCH_NODES_SUCCESS:
      return action.payload.nodes
        .reduce(
          (map: INodes, node: INodeContent) => map.set(node.id, new NodeContent(node)),
          OrderedMap<IdType, NodeContent>()
        );

    case POST_NODE_SUCCESS: {
      const newNode = new NodeContent(action.payload);

      return state.set(newNode.id, newNode);
    }

    default:
      return state;
  }
};
