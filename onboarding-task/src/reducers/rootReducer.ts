import { nodesListReducer } from './listReducers/nodesListReducer';
import { IAppState } from './IAppState';

export const rootReducer = (state: IAppState = {} as IAppState, action: IAction): IAppState => ({
  nodesList: nodesListReducer(state.nodesList, action),
});

