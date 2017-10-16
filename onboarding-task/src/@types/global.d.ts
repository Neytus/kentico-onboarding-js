import { IAppState } from '../reducers/IAppState';

export type IAction = {
  type: string;
  payload?: any;
};

type ThunkPromise = (dispatch: Dispatch, getState: () => IAppState) => Promise<IAction>;
type BasicDispatch = (action: IAction) => IAction;
type ThunkDispatch = (thunkAction: ThunkPromise) => Promise<IAction>;

declare global {
  type Dispatch = BasicDispatch & ThunkDispatch;
  type Guid = string;
}
