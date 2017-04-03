import { Record } from 'immutable';
import { IItem } from './IItem';

interface IItemParams {
  readonly id?: string;
  readonly text?: string;
}

const itemDefaultValues: IItem = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
};

export class Item extends Record(itemDefaultValues) implements IItem {
  readonly id: string;
  readonly text: string;
  with = (params: IItemParams) : Item => {

    return this.merge(params) as Item;
  }
}
