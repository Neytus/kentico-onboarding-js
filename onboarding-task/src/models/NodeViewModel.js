import memoize from 'memoizee';
import { Record, OrderedMap } from 'immutable';

const NodeViewModel = Record({
  id: '00000000000000000000000000000000',
  text: '',
  isBeingEdited: false,
  index: 0,
}, 'NodeViewModel');

const createNodeViewModel = (nodeContent, nodeInfo, index) => new NodeViewModel({
  ...nodeContent.toObject(),
  ...nodeInfo.toObject(),
  index,
});

const createNodeViewModels = (nodes, nodeInfos) => {
  let nodeViewModels = new OrderedMap();
  let index = 1;

  return nodes.map((value, key) => {
    const nodeViewModel = createNodeViewModel(
      nodes.get(key),
      nodeInfos.get(key),
      index++);
    nodeViewModels = nodeViewModels.set(key, nodeViewModel);
    return nodeViewModel;
  });
};

const createMemoizedNodeViewModels = memoize(createNodeViewModels);

export { createMemoizedNodeViewModels };

