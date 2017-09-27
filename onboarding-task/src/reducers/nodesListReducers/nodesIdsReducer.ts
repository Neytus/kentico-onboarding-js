import { List } from 'immutable';

import {
  DELETE_NODE,
  FETCH_NODES_SUCCESS,
  POST_NODE_SUCCESS,
} from '../../actions/actionTypes';
import { IAction } from '../../actions/IAction';
import { INodeContent } from '../../models/NodeContent';

export type INodesIds = List<IdType>;

export const nodesIdsReducer = (state: INodesIds = List<IdType>(), action: IAction): INodesIds => {
  switch (action.type) {
    case DELETE_NODE:
      return state.filter(nodeId => nodeId !== action.payload.id).toList();

    case FETCH_NODES_SUCCESS:
      return action.payload.nodes
        .reduce(
          (list: INodesIds, node: INodeContent) => list.push(node.id),
          List<IdType>()
        );

    case POST_NODE_SUCCESS:
      return state.push(action.payload.id);

    default:
      return state;
  }
};
