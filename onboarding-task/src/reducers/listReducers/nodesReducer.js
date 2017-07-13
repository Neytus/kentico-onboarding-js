import {
  ADD_NODE,
  SAVE_NODE,
  DELETE_NODE,
} from '../../actions/actionTypes';
import { OrderedMap } from 'immutable';
import { NodeContent } from '../../models/NodeContent';

export const nodesReducer = (state = OrderedMap(), action) => {
  switch (action.type) {
    case ADD_NODE: {
      const newNode = new NodeContent({
        id: action.id,
        text: action.text,
      });

      return state.set(newNode.id, newNode);
    }
    case DELETE_NODE:
      return state.delete(action.id);
    case SAVE_NODE:
      return state.setIn([action.id, 'text'], action.text);
    default:
      return state;
  }
};
