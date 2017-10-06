import { OrderedMap } from 'immutable';

import {
  SAVE_NODE,
  FETCH_NODES_SUCCESS,
  POST_NODE_SUCCESS,
  DELETE_NODE_SUCCESS,
  POST_NODE_OPTIMISTIC,
} from '../../actions/actionTypes';
import { INodeContent, NodeContent } from '../../models/NodeContent';
import { IAction } from '../../actions/IAction';

export type INodes = OrderedMap<Guid, NodeContent>;

export const nodesReducer = (state: INodes = OrderedMap<Guid, NodeContent>(), action: IAction): INodes => {
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
          OrderedMap<Guid, NodeContent>()
        );

    case POST_NODE_OPTIMISTIC: {
      const newNode = new NodeContent(action.payload);

      return state.set(newNode.id, newNode);
    }

    case POST_NODE_SUCCESS: {
      const temporaryState = state.delete(action.payload.temporaryId);
      const persistedNode = new NodeContent({id: action.payload.id, text: action.payload.text});

      return temporaryState.set(persistedNode.id, persistedNode);
    }

    default:
      return state;
  }
};
