import { Record } from 'immutable';

const defaultNodeViewModel = {
  id: '00000000000000000000000000000000',
  isBeingEdited: false,
  text: '',
  index: 0,
};

export const NodeViewModel = Record(defaultNodeViewModel, 'NodeViewModel');
