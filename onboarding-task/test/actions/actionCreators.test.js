import * as actions from '../../src/actions/actionCreators.ts';
import * as types from '../../src/actions/actionTypes.ts';

const id = '80149842-a624-b66b-5d3c-37c24523ba46';

describe('actionCreators', () => {
  describe('POST_NODE_SUCCESS', () => {
    it('returns a correct new action', () => {
      const text = 'New action test';
      const expectedAction = {
        type: types.POST_NODE_SUCCESS,
        payload: {
          id,
          text,
        },
      };

      const actualAction = actions.postNodeSuccess(expectedAction.payload);

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

  describe('saveNode', () => {
    it('returns a correct new action', () => {
      const text = 'random text';
      const expectedAction = {
        type: types.SAVE_NODE,
        payload: {
          id,
          text,
        },
      };

      expect(actions.saveNode(id, text)).toEqual(expectedAction);
    });
  });

  describe('deleteNode', () => {
    it('returns a correct new action', () => {
      const expectedAction = {
        type: types.DELETE_NODE,
        payload: {
          id,
        },
      };

      expect(actions.deleteNode(id)).toEqual(expectedAction);
    });
  });
});
