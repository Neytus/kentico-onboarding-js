import { OrderedMap } from 'immutable';

import {
  ADD_NODE,
  SAVE_NODE,
  DELETE_NODE,
} from '../../actions/actionTypes';
import { NodeContent } from '../../models/NodeContent';
import { IAction } from '../../actions/actionCreators';

export type INodes = OrderedMap<string, NodeContent>;

export const nodesReducer = (state: INodes = OrderedMap<string, NodeContent>(), action: IAction): INodes => {
  switch (action.type) {
    case ADD_NODE: {
      const newNode = new NodeContent(action.payload);

      return state.set(newNode.id, newNode);
    }
    case DELETE_NODE:
      return state.delete(action.payload.id);
    case SAVE_NODE: {
      const newNode = state.get(action.payload.id).with(action.payload);

      return state.set(newNode.id, newNode);
    }
    default:
      return state;
  }
};
