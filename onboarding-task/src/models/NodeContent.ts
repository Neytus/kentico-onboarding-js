import { TypedRecord } from './TypedRecord';

interface INodeContent {
  readonly id: string;
  readonly text: string;
}


const defaultNodeContent: INodeContent = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
};

class NodeContent extends TypedRecord<INodeContent>(defaultNodeContent) implements INodeContent {
  readonly id: string;
  readonly text: string;

  constructor(params: INodeContent) {
    super(params);
  }

  with = (values: INodeContent) => this.merge(values) as this;
}

// export const setNewValues = (oldNode: NodeContent, values: INodeContent): NodeContent => oldNode.merge(values) as NodeContent;
//
// export const setValues = <T, U>(oldNode: T, values: U ): T => {
//  return oldNode.merge(values) as T;
// };

export { NodeContent };
