import { List } from 'immutable';
import { IAction } from '../../actions/IAction';
import { FETCH_NODES_FAILURE } from '../../actions/actionTypes';

export type IErrorList = List<string>;

export const errorReducer = (state: IErrorList = List<string>(), action: IAction): IErrorList => {
  switch (action.type) {
    case (FETCH_NODES_FAILURE):
      return state.set(state.count(), action.payload.text);
    default:
      return state;
  }
};

