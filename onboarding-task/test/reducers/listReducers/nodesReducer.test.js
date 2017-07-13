import * as actions from '../../../src/actions/actionCreators';
import { generateId } from '../../../src/utils/generateId';
import { OrderedMap } from 'immutable';
import { NodeContent } from '../../../src/models/NodeContent';
import { nodesReducer } from '../../../src/reducers/listReducers/nodesReducer';

const initialState = OrderedMap();
const id = generateId();
const text = 'testing text';
const node = new NodeContent({
  id,
  text,
});
const nonEmptyState = initialState.set(id, node);

describe('nodesInfosReducer', () => {
  it('returns initial state', () => {
    expect(nodesReducer(undefined, {})).toEqual(OrderedMap());
  });

  it('handles adding a node', () => {
    expect(nodesReducer(initialState, actions.addNode(id, text))).toEqual(nonEmptyState);
  });

  it('handles deleting a node', () => {
    expect(nodesReducer(nonEmptyState, actions.deleteNode(id))).toEqual(initialState);
  });

  it('handles deleting a nonexistent node', () => {
    expect(nodesReducer(initialState, actions.deleteNode(id))).toEqual(initialState);
  });

  it('handles saving a new node text', () => {
    const newText = 'changed text';
    const updatedNode = new NodeContent({
      id,
      text: newText,
    });
    const newNonEmptyState = initialState.set(id, updatedNode);
    expect(nodesReducer(nonEmptyState, actions.saveNode(id, newText))).toEqual(newNonEmptyState);
  });
});
