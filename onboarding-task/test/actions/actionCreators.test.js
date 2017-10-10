import * as actions from '../../src/actions/actionCreators.ts';
import * as types from '../../src/actions/actionTypes.ts';

const id = '80149842-a624-b66b-5d3c-37c24523ba46';

describe('actionCreators', () => {
  describe('postNodeOptimistically', () => {
    it('returns a correct new action', () => {
      const text = 'New action test';
      const expectedAction = {
        type: types.POST_NODE_OPTIMISTIC,
        payload: {
          id,
          text,
        },
      };

      const actualAction = actions.postNodeOptimistically(expectedAction.payload);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('deleteError', () => {
    it('returns a correct new action', () => {
      const expectedAction = {
        type: types.DELETE_ERROR,
        payload: {
          id,
        },
      };

      const actualAction = actions.deleteError(id);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('postNodeSuccess', () => {
    it('returns a correct new action', () => {
      const text = 'some text';
      const temporaryId = '849e43f2-55de-48fe-ae4b-3510e60b17ca';
      const expectedAction = {
        type: types.POST_NODE_SUCCESS,
        payload: {
          id,
          text,
          temporaryId,
        },
      };

      const actualAction = actions.postNodeSuccess(temporaryId, {
        id,
        text,
      });

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('toggleNode', () => {
    it('returns a correct new action', () => {
      const expectedAction = {
        type: types.TOGGLE_NODE,
        payload: {
          id,
        },
      };

      expect(actions.toggleNode(id)).toEqual(expectedAction);
    });
  });

  describe('putNodeSuccess', () => {
    it('returns a correct new action', () => {
      const text = 'random text';
      const nodeDataToPut = { id, text };
      const expectedAction = {
        type: types.PUT_NODE_SUCCESS,
        payload: {
          id,
          text,
        },
      };

      expect(actions.putNodeSuccess(nodeDataToPut)).toEqual(expectedAction);
    });
  });


});
