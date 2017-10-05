import { TypedRecord } from './TypedRecord';

interface INodeInfo {
  readonly isBeingEdited: boolean;
  readonly isPersisted: boolean;
}

const defaultNodeInfo: INodeInfo = {
  isBeingEdited: false,
  isPersisted: true,
};

class NodeInfo extends TypedRecord<NodeInfo, INodeInfo>(defaultNodeInfo) implements INodeInfo {
  readonly isBeingEdited: boolean;
  readonly isPersisted: boolean;
}

export { NodeInfo };
