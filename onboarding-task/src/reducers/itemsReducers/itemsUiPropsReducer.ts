import { Map } from 'immutable';

import { ItemUiPropsRecord } from '../../models/ItemUiPropsRecord';
import {
  CREATE_ITEM_IN_LIST,
  SWITCH_FORM_VISIBILITY_FOR_ITEM,
  DELETE_ITEM_FROM_LIST,
  FETCH_ITEMS_SUCCESS,
  SEND_ITEM_SUCCESS,
  SEND_ITEM_FAILURE,
  UPDATE_TEXT_OF_ITEM,
} from '../../constants/actionTypes';
import { IAction } from '../../interfaces/IAction';
import { IFetchedItem } from '../../interfaces/IFetchedItem';

const itemsUiPropsReducer = (prevState = Map<string, ItemUiPropsRecord>(), action: IAction): Map<string, ItemUiPropsRecord> => {
  switch (action.type) {
    case CREATE_ITEM_IN_LIST:
      return prevState.set(action.payload.id, new ItemUiPropsRecord());

    case UPDATE_TEXT_OF_ITEM:
    case SWITCH_FORM_VISIBILITY_FOR_ITEM:
      const formDisplayed = !prevState.get(action.payload.id).formDisplayed;
      return prevState.setIn([action.payload.id, 'formDisplayed'], formDisplayed);

    case DELETE_ITEM_FROM_LIST:
      return prevState.delete(action.payload.id);

    case FETCH_ITEMS_SUCCESS:
      const tmpResult: { [key: string]: ItemUiPropsRecord } = {};
      action.payload.response.forEach((item: IFetchedItem) => {
        tmpResult[item.id] = new ItemUiPropsRecord({ savedOnServer: true });
      });
      return Map<string, ItemUiPropsRecord>(tmpResult);

    case SEND_ITEM_SUCCESS:
      const oldItemUiProps = prevState.get(action.payload.item.ueid);
      const tmpState = prevState.delete(action.payload.item.ueid);
      return tmpState.set(action.payload.item.id, oldItemUiProps.merge({ savedOnServer: true }) as ItemUiPropsRecord);

    case SEND_ITEM_FAILURE:
      return prevState.delete(action.payload.itemId);

    default:
      return prevState;
  }
};

export { itemsUiPropsReducer };
