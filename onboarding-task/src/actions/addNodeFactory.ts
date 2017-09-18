import { IAction } from './IAction';

export const addErrorFactory = (type: string, generateId: () => IdType) => (text: string): IAction => ({
  type,
  payload: {
    id: generateId(),
    text,
  },
});
