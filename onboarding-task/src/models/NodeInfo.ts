import { Record } from 'immutable';


interface INodeInfo {
  readonly isBeingEdited: boolean;
}

const defaultNodeInfo: INodeInfo = {
  isBeingEdited: false,
};

class NodeInfo extends Record(defaultNodeInfo) implements INodeInfo {
  readonly isBeingEdited: boolean;
}

export { NodeInfo }
