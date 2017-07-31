import { ADD_NODE } from './actionTypes';

export const addNodeFactory = (generateId: () => IdType) => (text: string): IAction => ({
  type: ADD_NODE,
  payload: {
    id: generateId(),
    text,
  },
});
