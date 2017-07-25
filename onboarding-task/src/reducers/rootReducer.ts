import { combineReducers } from 'redux';

import { nodesListReducer } from './listReducers/nodesListReducer.ts';

export const rootReducer = combineReducers({
  nodesList: nodesListReducer,
});

