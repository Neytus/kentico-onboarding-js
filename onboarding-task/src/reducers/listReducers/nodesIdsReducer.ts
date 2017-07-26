import { List } from 'immutable';

import {
  ADD_NODE,
  DELETE_NODE,
} from '../../actions/actionTypes';
import { IAction } from '../../actions/actionCreators';

export type INodesIds = List<string>;

export const nodesIdsReducer = (state: INodesIds = List<string>(), action: IAction): INodesIds => {
  switch (action.type) {
    case ADD_NODE:
      return state.push(action.payload.id);
    case DELETE_NODE: {
      const index = state.indexOf(action.payload.id);
      if (index === -1) {
        return state;
      }
      return state.delete(index);
    }
    default:
      return state;
  }
};
