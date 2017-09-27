import {
  TOGGLE_NODE,
  SAVE_NODE,
  DELETE_NODE,
  FETCH_NODES_REQUEST,
  FETCH_NODES_SUCCESS,
  DELETE_ERROR,
  POST_NODE_REQUEST,
  POST_NODE_SUCCESS,
  POST_NODE_FAILURE,
  FETCH_NODES_FAILURE,
} from './actionTypes';
import { IAction } from './IAction';
import { fetchNodesFactory } from './fetchNodesFactory';
import { postNodeFactory } from './postNodeFactory';
import { errorFactory } from './addErrorFactory';
import { generateId } from '../utils/generateId';
import { DEFAULT_ROUTE } from '../constants/routes';
import { parseFetchedNodes } from '../utils/parseFetchedNodes';
import { INodeContent } from '../models/NodeContent';

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
  type: FETCH_NODES_REQUEST
});

export const fetchNodesSuccess = (nodes: Array<object>): IAction => ({
  type: FETCH_NODES_SUCCESS,
  payload: {
    nodes
  }
});

export const fetchNodesFailure = errorFactory(generateId, FETCH_NODES_FAILURE);

export const postNodeRequest = (): IAction => ({
  type: POST_NODE_REQUEST,
});

export const postNodeSuccess = ({id, text}: INodeContent): IAction => ({
  type: POST_NODE_SUCCESS,
  payload: {
    id,
    text
  }
});

export const postNodeFailure = errorFactory(generateId, POST_NODE_FAILURE);

export const deleteError = (id: IdType): IAction => ({
  type: DELETE_ERROR,
  payload: {
    id
  }
});

export const fetchNodes = fetchNodesFactory({
  fetch: () => fetch(DEFAULT_ROUTE),
  fetchRequest: fetchNodesRequest,
  fetchSuccess: fetchNodesSuccess,
  fetchFailure: fetchNodesFailure,
  parseFetchedNodes
});

export const postNode = postNodeFactory({
  fetch: (body: object) => fetch(DEFAULT_ROUTE, body),
  postRequest: postNodeRequest,
  postSuccess: postNodeSuccess,
  postFailure: postNodeFailure,
});
