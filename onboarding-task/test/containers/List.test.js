import { OrderedMap } from 'immutable';

import { NodeContent } from '../../src/models/NodeContent';
import { getMemoizedSequence } from '../../src/containers/List';

const id = '80149842-a624-b66b-5d3c-37c24523ba46';
const nodes = OrderedMap();
const nodesMap = nodes.set(id, new NodeContent);

describe('List container', () => {
  describe('getMemoizedSequence', () => {
    it('is really memoized', () => {
      const expectedResult = getMemoizedSequence(nodesMap);

      const theSameResult = getMemoizedSequence(nodesMap);

      expect(theSameResult).toBe(expectedResult);
    });
  });
});
