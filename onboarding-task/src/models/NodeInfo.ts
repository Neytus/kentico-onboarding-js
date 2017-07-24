import { Record } from 'immutable';


interface INodeInfo {
  isBeingEdited: boolean;
}

const defaultNodeInfo: INodeInfo = {
  isBeingEdited: false,
};

class NodeInfo extends Record(defaultNodeInfo) implements INodeInfo {
  isBeingEdited: boolean;
}

export { NodeInfo }
