import { IAction } from './IAction';

export const errorFactory = (generateId: () => IdType, actionType: string) => (text: string): IAction => ({
  type: actionType,
  payload: {
    id: generateId(),
    text,
  },
});
