import { combineReducers } from 'redux';
import { nodesListReducer } from './listReducers/nodesListReducer';

const rootReducer = combineReducers({
  nodesList: nodesListReducer,
});

export { rootReducer };
