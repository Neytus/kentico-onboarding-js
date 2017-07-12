import {
  ADD_NODE,
  TOGGLE_NODE,
  SAVE_NODE,
  DELETE_NODE,
} from './actionTypes';
import { combineReducers } from 'redux';
import { OrderedMap } from 'immutable';
import { NodeContent } from '../models/NodeContent';
import { NodeInfo } from '../models/NodeInfo';

const nodesReducer = (state = OrderedMap(), action) => {
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

const nodesInfosReducer = (state = OrderedMap(), action) => {
  switch (action.type) {
    case ADD_NODE:
      return state.set(action.id, new NodeInfo());
    case DELETE_NODE:
      return state.delete(action.id);
    case TOGGLE_NODE:
      return state.updateIn(
        [action.id, 'isBeingEdited'],
        isBeingEdited => !isBeingEdited
      );
    case SAVE_NODE:
      return state.updateIn(
        [action.id, 'isBeingEdited'],
        false,
      );
    default:
      return state;
  }
};

const nodesListReducer = combineReducers({
  nodes: nodesReducer,
  nodesInfos: nodesInfosReducer,
});

const rootReducer = combineReducers({
  nodesList: nodesListReducer,
});

export { rootReducer };
