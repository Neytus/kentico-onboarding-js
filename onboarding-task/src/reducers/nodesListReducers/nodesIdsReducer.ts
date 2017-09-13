import { List } from 'immutable';

import {
  DELETE_NODE,
  FETCH_NODES_SUCCESS,
  POST_NODE_SUCCESS,
} from '../../actions/actionTypes';
import { IAction } from '../../actions/IAction';
import { IFetchedNode } from '../../actions/actionCreators';

export type INodesIds = List<IdType>;

export const nodesIdsReducer = (state: INodesIds = List<IdType>(), action: IAction): INodesIds => {
  switch (action.type) {
    case DELETE_NODE: {
      const index = state.indexOf(action.payload.id);
      if (index === -1) {
        return state;
      }

      return state.delete(index);
    }
    case FETCH_NODES_SUCCESS: {
      return action.payload.nodes
        .reduce(
          (list: INodesIds, node: IFetchedNode) => list.push(node.id),
          List<IdType>()
        );
    }
    case POST_NODE_SUCCESS:
      return state.push(action.payload.id);
    default:
      return state;
  }
};
