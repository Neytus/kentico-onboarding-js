import { OrderedMap } from 'immutable';

import * as actions from '../../../src/actions/actionCreators.ts';
import { NodeContent } from '../../../src/models/NodeContent.ts';
import { nodesReducer } from '../../../src/reducers/nodesListReducers/nodesReducer.ts';

describe('nodesReducer', () => {
  const emptyState = OrderedMap();
  const id = '80149842-a624-b66b-5d3c-37c24523ba46';
  const anotherId = '05012399-087d-4944-a742-7cf698e01b85';
  const text = 'testing text';
  const node = new NodeContent({
    id,
    text,
  });
  const anotherNode = new NodeContent({
    id: anotherId,
    text: 'another testing text',
  });
  const nonEmptyState = emptyState.set(id, node);

  it('returns initial state', () => {
    const initialState = undefined;
    const action = { type: 'UNKNOWN' };

    const actualState = nodesReducer(initialState, action);

    expect(actualState).toEqual(emptyState);
  });

  describe('POST_NODE_OPTIMISTIC', () => {
    it('handles adding a node', () => {
      const action = actions.postNodeOptimistically({
        id,
        text,
      });

      const actualState = nodesReducer(emptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });

  describe('POST_NODE_SUCCESS', () => {
    it('handles adding a node', () => {
      const action = actions.postNodeSuccess(id, anotherNode);
      const expectedState = emptyState.set(anotherId, anotherNode);

      const actualState = nodesReducer(emptyState, action);

      expect(actualState).toEqual(expectedState);
    });

    it('successfully replaces a non persistent node', () => {
      const action = actions.postNodeSuccess(id, anotherNode);
      const expectedState = emptyState.set(anotherId, anotherNode);

      const actualState = nodesReducer(nonEmptyState, action);

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('FETCH_NODES_SUCCESS', () => {
    it('handles fetching multiple nodes at once', () => {
      const action = actions.fetchNodesSuccess([
        {
          id,
          text,
        },
        {
          id: anotherId,
          text: 'another testing text',
        },
      ]);
      const expectedState = nonEmptyState.set(anotherId, anotherNode);

      const actualState = nodesReducer(emptyState, action);

      expect(expectedState).toEqual(actualState);
    });

    it('handles fetching 0 nodes', () => {
      const action = actions.fetchNodesSuccess([]);

      const actualState = nodesReducer(emptyState, action);

      expect(emptyState).toEqual(actualState);
    });
  });

  describe('DELETE_NODE_SUCCESS', () => {
    it('handles deleting a node', () => {
      const action = actions.deleteNodeSuccess(id);

      const actualState = nodesReducer(nonEmptyState, action);

      expect(actualState).toEqual(emptyState);
    });

    it('handles deleting a nonexistent node', () => {
      const action = actions.deleteNodeSuccess(id);

      const actualState = nodesReducer(emptyState, action);

      expect(actualState).toEqual(emptyState);
    });

    it('handles deleting a nonexistent node from non empty state', () => {
      const action = actions.deleteNodeSuccess('44005242-d624-b669-5d3c-37c11523ba85');

      const actualState = nodesReducer(nonEmptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });

  describe('SAVE_NODE', () => {
    it('handles saving a new node text', () => {
      const newText = 'changed text';
      const updatedNode = new NodeContent({
        id,
        text: newText,
      });
      const newNonEmptyState = emptyState.set(id, updatedNode);
      const action = actions.saveNode(id, newText);

      const actualState = nodesReducer(nonEmptyState, action);

      expect(actualState).toEqual(newNonEmptyState);
    });
  });
});
