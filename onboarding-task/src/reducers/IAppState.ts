import { INodesList } from './listReducers/INodesList';
import { IAction } from '../actions/actionCreators';

export interface IAppState {
  nodesList: INodesList;
}

export interface Dispatch {
  (action: IAction): IAction;
}
