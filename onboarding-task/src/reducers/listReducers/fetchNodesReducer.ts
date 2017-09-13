import { IAction } from '../../actions/IAction';
import { FETCH_NODES_REQUEST, FETCH_NODES_SUCCESS, FETCH_NODES_FAILURE } from '../../actions/actionTypes';

export const fetchNodesReducer = (state = true, action: IAction): boolean => {
  switch (action.type) {
    case FETCH_NODES_REQUEST:
      return true;
    case FETCH_NODES_FAILURE: {
      return false;
    }
    case FETCH_NODES_SUCCESS:
      return false;
    default:
      return state;
  }
};
