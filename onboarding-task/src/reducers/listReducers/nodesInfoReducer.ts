import { OrderedMap } from 'immutable';

import {
  ADD_NODE,
  TOGGLE_NODE,
  SAVE_NODE,
  DELETE_NODE,
} from '../../actions/actionTypes';
import { NodeInfo } from '../../models/NodeInfo';

export type INodesInfo = OrderedMap<string, NodeInfo>;

export const nodesInfoReducer = (state: INodesInfo = OrderedMap<string, NodeInfo>(), action: IAction): INodesInfo => {
  switch (action.type) {
    case ADD_NODE:
      return state.set(action.payload.id, new NodeInfo({}));
    case DELETE_NODE:
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
    default:
      return state;
  }
};
