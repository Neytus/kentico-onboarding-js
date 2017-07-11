import { Record } from 'immutable';

const NodeViewModel = Record({
  id: '00000000000000000000000000000000',
  isBeingEdited: false,
  text: '',
  index: 0,
}, 'NodeViewModel');

const _createNodeViewModel = (nodeContent, nodeInfo, index) => {
  return NodeViewModel({
    id: nodeContent.id,
    isBeingEdited: nodeInfo.isBeingEdited,
    text: nodeContent.text,
    index: index + 1,
  });
};

export { _createNodeViewModel };
