import { Record } from 'immutable';

interface INodeContent {
  readonly id: string;
  readonly text: string;
}

const defaultNodeContent: INodeContent = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
};

class NodeContent extends Record(defaultNodeContent) implements INodeContent {
  readonly id: string;
  readonly text: string;
}

export { NodeContent };
