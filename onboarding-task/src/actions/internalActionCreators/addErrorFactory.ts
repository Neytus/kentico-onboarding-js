import { IAction } from '../../@types/global';

export const errorFactory = (generateId: () => Guid, actionType: string) => (text: string): IAction => ({
  type: actionType,
  payload: {
    id: generateId(),
    text,
  },
});
