import { Record } from 'immutable';

interface INodeContent {
  id: string;
  text: string;
}

const defaultNodeContent: INodeContent = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
};

class NodeContent extends Record(defaultNodeContent) implements INodeContent {
  id: string;
  text: string;
}

export { NodeContent };
