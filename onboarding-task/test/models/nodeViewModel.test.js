import { OrderedMap } from 'immutable';

import { NodeContent } from '../../src/models/NodeContent';
import { NodeInfo } from '../../src/models/NodeInfo';
import { createMemoizedNodeViewModels } from '../../src/models/NodeViewModel';

const node = new NodeContent();
const nodeInfo = new NodeInfo();
const nodes = new OrderedMap();
nodes.set(node.id, node);
const nodeInfos = new OrderedMap();
nodeInfos.set(node.id, nodeInfo);

describe('createMemoizedNodeViewModels', () => {
  it('is really memoized', () => {
    expect(createMemoizedNodeViewModels(nodes, nodeInfos)).toBe(createMemoizedNodeViewModels(nodes, nodeInfos));
  });
});
