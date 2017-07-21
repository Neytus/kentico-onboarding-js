import { List } from 'immutable';

import {
  ADD_NODE,
  DELETE_NODE,
} from '../../actions/actionTypes';

export const nodesIdsReducer = (state = List(), action) => {
  switch (action.type) {
    case ADD_NODE:
      return state.push(action.payload.id);
    case DELETE_NODE:
      return state.delete(state.indexOf(action.payload.id));
    default:
      return state;
  }
};
