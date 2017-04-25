import { item } from '../../src/reducers/item.ts';
import { ItemRecord } from '../../src/models/ItemRecord.ts';
import * as actions from '../../src/actions/actionCreators.ts';

const initialState = new ItemRecord({
  guid: '00000',
  text: 'Redux rocks!',
  isEdited: false,
});

const newItem = {
  id: '00000',
  text: 'new text',
};

const UNKNOWN_ACTION = 'unknown action';

describe('item reducer', () => {
  it('should return the initial state', () => {
    const actualState = item(initialState, UNKNOWN_ACTION);

    expect(actualState).toEqual(initialState);
  });

  it('should return default item record', () => {
    const actualState = item(undefined, UNKNOWN_ACTION);

    expect(actualState).toEqual(new ItemRecord({}));
  });

  it('should handle TOGGLE_EDIT_MODE action', () => {
    const toggleEditModeAction = actions.toggleEditMode('00000');

    const actualState = item(initialState, toggleEditModeAction);
    const expectedState = new ItemRecord({
      text: 'Redux rocks!',
      guid: '00000',
      isEdited: !initialState.isEdited,
    });

    expect(actualState).toEqual(expectedState);
  });

  it('should handle UPDATE_ITEM_TEXT action', () => {
    const updateItemAction = actions.updateItemText('00000', 'new text');
    const actualState = item(initialState, updateItemAction);
    const expectedState = new ItemRecord({
      text: 'new text',
      guid: '00000',
      isEdited: false,
    });

    expect(actualState).toEqual(expectedState);
  });

  it('should handle POST_ITEM_SUCCESS action', () => {
    const postItemAction = actions.postItemSuccess(newItem);
    const expectedState = new ItemRecord({
      text: 'new text',
      guid: '00000',
      isEdited: false,
    });
    const actualState = item(initialState, postItemAction);

    expect(actualState).toEqual(expectedState);
  });
});
