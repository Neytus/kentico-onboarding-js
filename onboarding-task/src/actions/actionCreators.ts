import {
  TOGGLE_NODE,
  SAVE_NODE,
  DELETE_NODE,
  FETCH_NODES_REQUEST,
  FETCH_NODES_SUCCESS,
  DELETE_ERROR,
  POST_NODE_REQUEST,
  POST_NODE_SUCCESS,
} from './actionTypes';
import { IAction } from './IAction';
import { fetchNodesFactory } from './fetchNodesFactory';
import { postNodeFactory } from './postNodeFactory';
import { addFetchErrorFactory, addPostErrorFactory } from './addErrorFactory';
import { generateId } from '../utils/generateId';
import { DEFAULT_ROUTE } from '../constants/routes';

export const toggleNode = (id: IdType): IAction => ({
  type: TOGGLE_NODE,
  payload: {
    id,
  },
});

export const deleteNode = (id: IdType): IAction => ({
  type: DELETE_NODE,
  payload: {
    id,
  },
});

export const saveNode = (id: IdType, text: string): IAction => ({
  type: SAVE_NODE,
  payload: {
    id,
    text,
  },
});

export const fetchNodesRequest = (): IAction => ({
  type: FETCH_NODES_REQUEST,
  payload: {}
});

export const fetchNodesSuccess = (nodes: Array<object>): IAction => ({
  type: FETCH_NODES_SUCCESS,
  payload: {
    nodes
  }
});

export const fetchNodesFailure = addPostErrorFactory(generateId);

export const postNodeRequest = (): IAction => ({
  type: POST_NODE_REQUEST,
  payload: {}
});

export const postNodeSuccess = ({id, text}: IFetchedNode): IAction => ({
  type: POST_NODE_SUCCESS,
  payload: {
    id,
    text
  }
});

export const postNodeFailure = addFetchErrorFactory(generateId);

export const deleteError = (id: IdType): IAction => ({
  type: DELETE_ERROR,
  payload: {
    id
  }
});

export interface IFetchedNode {
  id: IdType;
  text: string;
}

export const fetchNodes = fetchNodesFactory({
  fetch: () => fetch(DEFAULT_ROUTE),
  fetchRequest: fetchNodesRequest,
  fetchSuccess: fetchNodesSuccess,
  fetchFailure: fetchNodesFailure,
});

export const postNode = (text: string): ((dispatch: Dispatch) => Promise<IAction>) => postNodeFactory(text , {
  fetch: () => fetch(DEFAULT_ROUTE),
  postRequest: postNodeRequest,
  postSuccess: postNodeSuccess,
  postFailure: postNodeFailure,
});
