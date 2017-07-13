import * as actions from '../../src/actions/actionCreators';
import * as types from '../../src/actions/actionTypes';
import { generateId } from '../../src/utils/generateId';


describe('actionCreators', () => {
  describe('addNode', () => {
    it('returns a correct new action', () => {
      const text = 'New action test';
      const id = generateId();
      const expectedAction = {
        type: types.ADD_NODE,
        payload: {
          id,
          text,
        },
      };
      expect(actions.addNode(id, text)).toEqual(expectedAction);
    });
  });

  describe('toggleNode', () => {
    it('returns a correct new action', () => {
      const id = generateId();
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
      const id = generateId();
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
      const id = generateId();
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
