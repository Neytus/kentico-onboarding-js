import { ADD_NODE } from './actionTypes';
import { IAction } from './actionCreators';

interface IAddNodeFactory {
  (generateId: (() => string)): ((text: string) => IAction);
}

export const addNodeFactory: IAddNodeFactory = generateId => text => ({
  type: ADD_NODE,
  payload: {
    id: generateId(),
    text,
  },
});
