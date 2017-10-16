import { nodesListReducer } from './nodesListReducers/nodesListReducer';
import { IAppState } from './IAppState';
import { IAction } from '../@types/global';

export const rootReducer = (state: IAppState = {} as IAppState, action: IAction): IAppState => ({
  nodesList: nodesListReducer(state.nodesList, action),
});

