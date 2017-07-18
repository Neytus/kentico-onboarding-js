import * as actions from '../../../src/actions/actionCreators';
import { generateId } from '../../../src/utils/generateId';
import { OrderedMap } from 'immutable';
import { NodeInfo } from '../../../src/models/NodeInfo';
import { nodesInfosReducer } from '../../../src/reducers/listReducers/nodesInfosReducer';

describe('nodesInfosReducer', () => {

  const initialState = OrderedMap();
  const id = generateId();
  const defaultNode = new NodeInfo();
  const toggledNode = new NodeInfo({
    isBeingEdited: true,
  });
  const nonEmptyState = initialState.set(id, defaultNode);
  const stateWithToggledNode = initialState.set(id, toggledNode);

  it('returns initial state', () => {
    expect(nodesInfosReducer(undefined, {})).toEqual(OrderedMap());
  });

  describe('ADD_NODE', () => {
    it('handles adding a node', () => {
      expect(nodesInfosReducer(initialState, actions.addNode(id))).toEqual(nonEmptyState);
    });
  });

  describe('DELETE_NODE', () => {
    it('handles deleting a node', () => {
      expect(nodesInfosReducer(nonEmptyState, actions.deleteNode(id))).toEqual(initialState);
    });

    it('handles deleting a nonexistent node', () => {
      expect(nodesInfosReducer(initialState, actions.deleteNode(id))).toEqual(initialState);
    });
  });

  describe('TOGGLE_NODE', () => {
    it('handles toggling a node property to true', () => {
      expect(nodesInfosReducer(nonEmptyState, actions.toggleNode(id))).toEqual(stateWithToggledNode);
    });

    it('handles toggling a node property to false', () => {
      expect(nodesInfosReducer(stateWithToggledNode, actions.toggleNode(id))).toEqual(nonEmptyState);
    });
  });

  describe('CANCEL_NODE', () => {
    it('handles cancelling a node', () => {
      expect(nodesInfosReducer(stateWithToggledNode, actions.cancelNode(id))).toEqual(nonEmptyState);
    });
  });

  describe('SAVE_NODE', () => {
    it('handles saving a new node text', () => {
      expect(nodesInfosReducer(stateWithToggledNode, actions.saveNode(id))).toEqual(nonEmptyState);
    });
  });
});
