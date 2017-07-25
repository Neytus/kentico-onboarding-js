import { nodesListReducer } from './listReducers/nodesListReducer';
import { AppState } from '../AppState';
import { IAction } from '../actions/actionCreators';

export const rootReducer = (state: AppState = {} as AppState, action: IAction): AppState => ({
  nodesList: nodesListReducer(state.nodesList, action),
});

