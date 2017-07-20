import { combineReducers } from 'redux';

import { nodesReducer } from './nodesReducer';
import { nodesInfoReducer } from './nodesInfosReducer';

export const nodesListReducer = combineReducers({
  nodes: nodesReducer,
  nodesInfo: nodesInfoReducer,
});
