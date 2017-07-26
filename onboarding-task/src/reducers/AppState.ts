import { INodesList } from './listReducers/NodesList';
import { IAction } from '../actions/actionCreators';

export interface IAppState {
  nodesList: INodesList;
}

export interface Dispatch {
  (action: IAction): IAction;
}
