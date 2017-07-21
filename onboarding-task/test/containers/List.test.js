import { OrderedMap } from 'immutable';
import { NodeContent } from '../../src/models/NodeContent';
import { getMemoizedNodes } from '../../src/containers/List';

const id = '80149842-a624-b66b-5d3c-37c24523ba46';
const nodes = OrderedMap();
nodes.set(id, new NodeContent);
const nodesList = {
  nodes,
  nodesInfo: OrderedMap(),
};
const state = { nodesList };

describe('List container', () => {
  describe('getMemoizedNodes', () => {
    it('is really memoized', () => {
      const expectedResult = getMemoizedNodes(state);

      const theSameResult = getMemoizedNodes(state);

      expect(theSameResult).toBe(expectedResult);
    });
  });
});
