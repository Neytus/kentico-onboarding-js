import { combineReducers } from 'redux';

import { nodesReducer } from './nodesReducer';
import { nodesInfosReducer } from './nodesInfosReducer';

export const nodesListReducer = combineReducers({
  nodes: nodesReducer,
  nodesInfos: nodesInfosReducer,
});
