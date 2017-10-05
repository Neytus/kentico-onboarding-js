import { OrderedMap } from 'immutable';

import {
  TOGGLE_NODE,
  SAVE_NODE,
  FETCH_NODES_SUCCESS,
  POST_NODE_SUCCESS,
  DELETE_NODE_SUCCESS, POST_NODE_OPTIMISTIC,
} from '../../actions/actionTypes';
import { NodeInfo } from '../../models/NodeInfo';
import { IAction } from '../../actions/IAction';
import { INodeContent } from '../../models/NodeContent';

export type INodesInfo = OrderedMap<Guid, NodeInfo>;

export const nodesInfoReducer = (state: INodesInfo = OrderedMap<Guid, NodeInfo>(), action: IAction): INodesInfo => {
  switch (action.type) {
    case DELETE_NODE_SUCCESS:
      return state.delete(action.payload.id);

    case TOGGLE_NODE: {
      const oldNode = state.get(action.payload.id);
      const newNode = oldNode.with({isBeingEdited: !oldNode.isBeingEdited});

      return state.set(action.payload.id, newNode);
    }

    case SAVE_NODE: {
      const oldNode = state.get(action.payload.id);
      const newNode = oldNode.with({isBeingEdited: !oldNode.isBeingEdited});

      return state.set(action.payload.id, newNode);
    }

    case FETCH_NODES_SUCCESS:
      return action.payload.nodes
        .reduce(
          (map: INodesInfo, node: INodeContent) => map.set(node.id, new NodeInfo({})),
          OrderedMap<Guid, NodeInfo>()
        );

    case POST_NODE_OPTIMISTIC:
      return state.set(action.payload.id, new NodeInfo({}));

    case POST_NODE_SUCCESS: {
      const temporaryState = state.delete(action.payload.temporaryId);
      return temporaryState.set(action.payload.id, new NodeInfo({}));
    }

    default:
      return state;
  }
};
