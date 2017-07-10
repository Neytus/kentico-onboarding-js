import { Record } from 'immutable';

const defaultNode = {
  id: '00000000000000000000000000000000',
  isBeingEdited: false,
  text: '',
};

export const Node = Record(defaultNode, 'Node');

