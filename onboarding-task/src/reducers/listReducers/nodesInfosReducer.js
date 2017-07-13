import {
  ADD_NODE,
  TOGGLE_NODE,
  SAVE_NODE,
  DELETE_NODE,
} from '../../actions/actionTypes';
import { OrderedMap } from 'immutable';
import { NodeInfo } from '../../models/NodeInfo';

export const nodesInfosReducer = (state = OrderedMap(), action) => {
  switch (action.type) {
    case ADD_NODE:
      return state.set(action.payload.id, new NodeInfo());
    case DELETE_NODE:
      return state.delete(action.payload.id);
    case TOGGLE_NODE:
      return state.updateIn(
        [action.payload.id, 'isBeingEdited'],
        isBeingEdited => !isBeingEdited
      );
    case SAVE_NODE:
      return state.updateIn(
        [action.payload.id, 'isBeingEdited'],
        false,
      );
    default:
      return state;
  }
};
