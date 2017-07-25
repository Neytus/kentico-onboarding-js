import {
  TOGGLE_NODE,
  SAVE_NODE,
  DELETE_NODE,
} from './actionTypes';
import { addNodeFactory } from './addNodeFactory';
import { generateId } from '../utils/generateId';

export interface IAction {
  type: string;
  payload: any;
}

interface IAddNode {
  (text: string): IAction;
}

export const addNode: IAddNode = addNodeFactory(generateId);

export const toggleNode = (id: string): IAction => ({
  type: TOGGLE_NODE,
  payload: {
    id,
  },
});

export const deleteNode = (id: string): IAction => ({
  type: DELETE_NODE,
  payload: {
    id,
  },
});

export const saveNode = (id: string, text: string): IAction => ({
  type: SAVE_NODE,
  payload: {
    id,
    text,
  },
});
