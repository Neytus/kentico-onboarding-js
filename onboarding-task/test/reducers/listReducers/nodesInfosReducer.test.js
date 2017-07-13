import * as actions from '../../../src/actions/actionCreators';
import { generateId } from '../../../src/utils/generateId';
import { OrderedMap } from 'immutable';
import { NodeInfo } from '../../../src/models/NodeInfo';
import { nodesInfosReducer } from '../../../src/reducers/listReducers/nodesInfosReducer';

const initialState = OrderedMap();
const id = generateId();
const defaultNode = new NodeInfo();
const toggledNode = new NodeInfo({
  isBeingEdited: true,
});
const nonEmptyState = initialState.set(id, defaultNode);
const stateWithToggledNode = initialState.set(id, toggledNode);

describe('nodesInfosReducer', () => {
  it('returns initial state', () => {
    expect(nodesInfosReducer(undefined, {})).toEqual(OrderedMap());
  });

  it('handles adding a node', () => {
    expect(nodesInfosReducer(initialState, actions.addNode(id))).toEqual(nonEmptyState);
  });

  it('handles deleting a node', () => {
    expect(nodesInfosReducer(nonEmptyState, actions.deleteNode(id))).toEqual(initialState);
  });

  it('handles toggling a node', () => {
    expect(nodesInfosReducer(nonEmptyState, actions.toggleNode(id))).toEqual(stateWithToggledNode);
  });

  it('handles saving a new node text', () => {
    expect(nodesInfosReducer(stateWithToggledNode, actions.saveNode(id))).toEqual(nonEmptyState);
  });
});
