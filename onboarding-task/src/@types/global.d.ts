import { IAction } from '../actions/actionCreators';

declare global {
  type Dispatch = {
    (action: IAction): IAction;
  };
}
