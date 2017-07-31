import { ADD_NODE } from './actionTypes';

export const addNodeFactory = (generateId: () => string) => (text: string): IAction => ({
  type: ADD_NODE,
  payload: {
    id: generateId(),
    text,
  },
});
