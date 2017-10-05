import { OrderedMap } from 'immutable';
import { IAction } from '../../actions/IAction';
import {
  FETCH_NODES_FAILURE,
  DELETE_ERROR,
  POST_NODE_FAILURE, DELETE_NODE_FAILURE
} from '../../actions/actionTypes';

export type IErrorsMap = OrderedMap<Guid, string>;

export const errorReducer = (state: IErrorsMap = OrderedMap<Guid, string>(), action: IAction): IErrorsMap => {
  switch (action.type) {
    case (DELETE_ERROR):
      return state.delete(action.payload.id);

    case (DELETE_NODE_FAILURE):
    case (FETCH_NODES_FAILURE):
    case (POST_NODE_FAILURE):
      return state.set(action.payload.id, action.payload.text);

    default:
      return state;
  }
};

