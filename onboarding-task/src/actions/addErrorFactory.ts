import { IAction } from './IAction';
import {
  FETCH_NODES_FAILURE,
  POST_NODE_FAILURE
} from './actionTypes';

export const addPostErrorFactory = (generateId: () => IdType) => (text: string): IAction => ({
  type: POST_NODE_FAILURE,
  payload: {
    id: generateId(),
    text,
  },
});

export const addFetchErrorFactory = (generateId: () => IdType) => (text: string): IAction => ({
  type: FETCH_NODES_FAILURE,
  payload: {
    id: generateId(),
    text,
  },
});

export const errorFactory = (generateId: () => IdType, actionType: string) => (text: string): IAction => ({
  type: actionType,
  payload: {
    id: generateId(),
    text,
  },
});
