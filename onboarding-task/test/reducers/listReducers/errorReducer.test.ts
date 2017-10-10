import { OrderedMap } from 'immutable';

import * as actions from '../../../src/actions/actionCreators';
import { errorReducer } from '../../../src/reducers/nodesListReducers/errorReducer';
import {
  POST_NODE_FAILURE,
  FETCH_NODES_FAILURE,
  PUT_NODE_FAILURE,
  DELETE_NODE_FAILURE
} from '../../../src/actions/actionTypes';

describe('errorReducer', () => {
  const emptyState = OrderedMap<Guid, string>();
  const id = '80149842-a624-b66b-5d3c-37c24523ba46';
  const anotherId = '05012399-087d-4944-a742-7cf698e01b85';
  const text = 'error text';
  const nonEmptyState = emptyState.set(id, text);
  const failureActionTypes = [
    POST_NODE_FAILURE,
    FETCH_NODES_FAILURE,
    PUT_NODE_FAILURE,
    DELETE_NODE_FAILURE
  ];

  it('returns initial state', () => {
    const initialState = undefined;
    const action = {type: 'UNKNOWN'};

    const actualState = errorReducer(initialState, action);

    expect(actualState).toEqual(emptyState);
  });

  describe('DELETE_ERROR', () => {
    it('deletes an error statement correctly', () => {
      const action = actions.deleteError(id);

      const actualState = errorReducer(nonEmptyState, action);

      expect(actualState).toEqual(emptyState);
    });

    it('handles deleting non-existent node correctly', () => {
      const action = actions.deleteError(anotherId);

      const actualState = errorReducer(nonEmptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });

  const testFailureAction = (type: string) => {
    const action = ({
      type,
      payload: {
        id,
        text
      }
    });

    const actualState = errorReducer(emptyState, action);

    expect(actualState).toEqual(nonEmptyState);
  };

  it('handles adding a new error call after a failure', () => {
    failureActionTypes.forEach(testFailureAction);
  });
});
