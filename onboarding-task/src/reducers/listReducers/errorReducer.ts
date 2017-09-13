import { OrderedMap } from 'immutable';
import { IAction } from '../../actions/IAction';
import {
  FETCH_NODES_FAILURE,
  DELETE_ERROR,
  POST_NODE_FAILURE
} from '../../actions/actionTypes';

export type IErrorsMap = OrderedMap<IdType, string>;

export const errorReducer = (state: IErrorsMap = OrderedMap<IdType, string>(), action: IAction): IErrorsMap => {
  switch (action.type) {
    case (DELETE_ERROR): {
      return state.delete(action.payload.id);
    }
    case (FETCH_NODES_FAILURE):
      return state.set(state.count().toString(), action.payload.text);
    case (POST_NODE_FAILURE):
      return state.set(state.count().toString(), action.payload.text);
    default:
      return state;
  }
};

