import { IAction } from '../actions/IAction';

export type ThunkPromise = (dispatch: Dispatch, getState: any) => Promise<IAction>;
type BasicDispatch = (action: IAction) => IAction;
type ThunkDispatch = (thunkAction: ThunkPromise) => Promise<IAction>;
type RequestInfo = Request | string | object;

declare global {
  type Dispatch = BasicDispatch & ThunkDispatch;
  type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

  type Guid = string;
}

export {};
