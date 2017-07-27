import { Record } from 'immutable';


interface INodeInfo {
  readonly isBeingEdited: boolean;
}

const defaultNodeInfo: INodeInfo = {
  isBeingEdited: false,
};

class NodeInfo extends Record(defaultNodeInfo) {
  readonly isBeingEdited: boolean;

  constructor(parameters?: Partial<INodeInfo>) {
    parameters ? super(parameters) : super();
  }

  with(values: Partial<INodeInfo>) {
    return this.merge(values) as this;
  }
}

export { NodeInfo }
