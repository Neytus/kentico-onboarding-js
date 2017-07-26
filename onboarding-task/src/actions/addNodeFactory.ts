import { ADD_NODE } from './actionTypes';
import { IAction } from './actionCreators';

export const addNodeFactory = (generateId: () => string) => (text: string): IAction => ({
  type: ADD_NODE,
  payload: {
    id: generateId(),
    text,
  },
});
