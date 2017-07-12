import { ADD_NODE, TOGGLE_NODE, SAVE_NODE, DELETE_NODE } from './actionTypes';
import { addNode, toggleNode, saveNode, deleteNode } from './actionCreators';
import { OrderedMap } from 'immutable';

const initialState = {
  nodes: OrderedMap(),
  nodesInfos: OrderedMap(),
};

const nodes = (state = initialState, action) => {

};

