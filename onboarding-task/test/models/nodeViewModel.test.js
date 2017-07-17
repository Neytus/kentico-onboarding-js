import { OrderedMap } from 'immutable';

import { NodeContent } from '../../src/models/NodeContent';
import { NodeInfo } from '../../src/models/NodeInfo';
import { createMemoizedNodeViewModels, createNodeViewModels } from '../../src/models/NodeViewModel';
import { generateId } from '../../src/utils/generateId';

describe('NodeViewModel', () => {
  const node = new NodeContent({
    id: generateId(),
    text: 'test text',
  });
  const nodeInfo = new NodeInfo();
  const nonEmptyNodes = new OrderedMap().set(node.id, node);
  const nonEmptyNodeInfos = new OrderedMap().set(node.id, nodeInfo);

  describe('createMemoizedNodeViewModels', () => {
    it('is really memoized', () => {
      const memoizedNodeViewModel = createMemoizedNodeViewModels(nonEmptyNodes, nonEmptyNodeInfos);
      expect(memoizedNodeViewModel).toBe(createMemoizedNodeViewModels(nonEmptyNodes, nonEmptyNodeInfos));
    });
  });
  describe('createNodeViewModels', () => {
    it('creates a new instance of the model every time when called', () => {
      const nodeViewModel = createNodeViewModels(nonEmptyNodes, nonEmptyNodeInfos);
      expect(nodeViewModel).not.toBe(createNodeViewModels(nonEmptyNodes, nonEmptyNodeInfos));
    });
  });
});
