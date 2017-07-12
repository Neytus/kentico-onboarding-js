import {
  ADD_NODE,
  TOGGLE_NODE,
  SAVE_NODE,
  DELETE_NODE,
} from './actionTypes';
import { OrderedMap } from 'immutable';
import { NodeContent } from '../models/NodeContent';
import { NodeInfo } from '../models/NodeInfo';

const initialState = {
  nodes: OrderedMap(),
  nodesInfos: OrderedMap(),
};

const nodes = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NODE: {
      const newNode = new NodeContent({
        id: action.id,
        text: action.text,
      });

      return state.set(newNode.id, newNode);
    }
    default:
      return state;
  }
};

const nodesInfos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NODE:
      return state.set(action.id, new NodeInfo());
    default:
      return state;
  }
};
