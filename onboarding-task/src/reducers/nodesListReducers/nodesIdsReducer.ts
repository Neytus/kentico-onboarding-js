import { List } from 'immutable';

import {
  DELETE_NODE_SUCCESS,
  FETCH_NODES_SUCCESS,
  POST_NODE_OPTIMISTIC,
  POST_NODE_SUCCESS,
} from '../../actions/actionTypes';
import { IAction } from '../../actions/IAction';
import { INodeContent } from '../../models/NodeContent';

export type INodesIds = List<Guid>;

export const nodesIdsReducer = (state: INodesIds = List<Guid>(), action: IAction): INodesIds => {
  switch (action.type) {
    case DELETE_NODE_SUCCESS:
      return state.filter(nodeId => nodeId !== action.payload.id).toList();

    case FETCH_NODES_SUCCESS:
      return action.payload.nodes
        .reduce(
          (list: INodesIds, node: INodeContent) => list.push(node.id),
          List<Guid>()
        );

    case POST_NODE_SUCCESS: {
      const temporaryList = state.filter(nodeId => nodeId !== action.payload.temporaryId).toList();
      return temporaryList.push(action.payload.id);
    }

    case POST_NODE_OPTIMISTIC:
      return state.push(action.payload.id);

    default:
      return state;
  }
};
