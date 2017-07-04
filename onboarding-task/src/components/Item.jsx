import { Record } from 'immutable';

const defaultItem = {
  id: '00000000000000000000000000000000',
  isBeingEdited: false,
  text: '',
};

export const Item = Record(defaultItem);

