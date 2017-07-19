import { NodeContent } from '../../src/models/NodeContent';
import { NodeInfo } from '../../src/models/NodeInfo';
import { createMemoizedNodeViewModel } from '../../src/models/NodeViewModel';
import { generateId } from '../../src/utils/generateId';

describe('NodeViewModel', () => {
  describe('createMemoizedNodeViewModel', () => {
    it('is really memoized', () => {
      const node = new NodeContent({
        id: generateId(),
        text: 'test text',
      });
      const nodeInfo = new NodeInfo();

      const expectedNodeViewModel = createMemoizedNodeViewModel(node, nodeInfo, 0);

      expect(expectedNodeViewModel).toBe(createMemoizedNodeViewModel(node, nodeInfo, 0));
    });
  });
});
