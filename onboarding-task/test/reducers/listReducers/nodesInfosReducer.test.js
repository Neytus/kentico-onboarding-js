import { OrderedMap } from 'immutable';

import * as actions from '../../../src/actions/actionCreators';
import { NodeInfo } from '../../../src/models/NodeInfo';
import { nodesInfosReducer } from '../../../src/reducers/listReducers/nodesInfosReducer';
import { addNodeFactory } from '../../../src/actions/addNodeFactory';

describe('nodesInfosReducer', () => {

  const emptyState = OrderedMap();
  const id = '80149842-a624-b66b-5d3c-37c24523ba46';
  const addNode = addNodeFactory(() => id);
  const defaultNode = new NodeInfo();
  const toggledNode = new NodeInfo({
    isBeingEdited: true,
  });
  const nonEmptyState = emptyState.set(id, defaultNode);
  const stateWithToggledNode = emptyState.set(id, toggledNode);

  it('returns initial state', () => {
    const initialState = undefined;
    const action = { type: 'UNKNOWN' };

    const actualState = nodesInfosReducer(initialState, action);

    expect(actualState).toEqual(emptyState);
  });

  describe('ADD_NODE', () => {
    it('handles adding a node', () => {
      const action = addNode();

      const actualState = nodesInfosReducer(emptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });

  describe('DELETE_NODE', () => {
    it('handles deleting a node', () => {
      const action = actions.deleteNode(id);

      const actualState = nodesInfosReducer(nonEmptyState, action);

      expect(actualState).toEqual(emptyState);
    });

    it('handles deleting a nonexistent node', () => {
      const action = actions.deleteNode(id);

      const actualState = nodesInfosReducer(emptyState, action);

      expect(actualState).toEqual(emptyState);
    });
  });

  describe('TOGGLE_NODE', () => {
    it('handles toggling a node property to true', () => {
      const action = actions.toggleNode(id);

      const actualState = nodesInfosReducer(nonEmptyState, action);

      expect(actualState).toEqual(stateWithToggledNode);
    });

    it('handles toggling a node property to false', () => {
      const action = actions.toggleNode(id);

      const actualState = nodesInfosReducer(stateWithToggledNode, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });

  describe('SAVE_NODE', () => {
    it('handles saving a new node text', () => {
      const action = actions.saveNode(id);

      const actualState = nodesInfosReducer(stateWithToggledNode, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });
});
