import * as memoize from 'memoizee';
import { Record } from 'immutable';

import { NodeContent } from './NodeContent';
import { NodeInfo } from './NodeInfo';

interface INodeViewModel {
  readonly id: string;
  readonly text: string;
  readonly isBeingEdited: boolean;
  readonly index: number;
}

interface ICreateNodeViewModel {
  (content: NodeContent, info: NodeInfo, index: number): INodeViewModel;
}

const defaultNodeViewModel: INodeViewModel = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
  isBeingEdited: false,
  index: 0,
};

class NodeViewModel extends Record(defaultNodeViewModel) implements INodeViewModel {
  readonly id: string;
  readonly text: string;
  readonly isBeingEdited: boolean;
  readonly index: number;
}

const createNodeViewModel: ICreateNodeViewModel = (nodeContent, nodeInfo, index) => {
  return new NodeViewModel({
    ...nodeContent.toObject(),
    ...nodeInfo.toObject(),
    index: index + 1,
  });
};

const createMemoizedNodeViewModel = memoize(createNodeViewModel);

export { createMemoizedNodeViewModel };
