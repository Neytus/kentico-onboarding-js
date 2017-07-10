import { Record } from 'immutable';

const defaultNodeInfo = {
  id: '00000000000000000000000000000000',
  isBeingEdited: false,
};

export const NodeInfo = Record(defaultNodeInfo, 'NodeInfo');
