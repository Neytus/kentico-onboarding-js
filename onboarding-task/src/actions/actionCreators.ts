import {
  TOGGLE_NODE,
  SAVE_NODE,
  FETCH_NODES_REQUEST,
  FETCH_NODES_SUCCESS,
  DELETE_ERROR,
  POST_NODE_REQUEST,
  POST_NODE_SUCCESS,
  POST_NODE_FAILURE,
  FETCH_NODES_FAILURE,
  DELETE_NODE_REQUEST,
  DELETE_NODE_SUCCESS,
  DELETE_NODE_FAILURE,
} from './actionTypes';
import { IAction } from './IAction';
import { fetchNodesFactory } from './fetchNodesFactory';
import { postNodeFactory } from './postNodeFactory';
import { errorFactory } from './addErrorFactory';
import { generateId } from '../utils/generateId';
import { DEFAULT_ROUTE } from '../constants/routes';
import { parseFetchedNode, parseFetchedNodes } from '../utils/parseFetchedNodes';
import { INodeContent } from '../models/NodeContent';
import { checkStatus } from '../utils/checkStatus';
import { deleteNodeFactory } from './deleteNodeFactory';

export const toggleNode = (id: Guid): IAction => ({
  type: TOGGLE_NODE,
  payload: {
    id,
  },
});

export const saveNode = (id: Guid, text: string): IAction => ({
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

export const deleteError = (id: Guid): IAction => ({
  type: DELETE_ERROR,
  payload: {
    id
  }
});

const getNodesFetch = () => fetch(DEFAULT_ROUTE)
  .catch(() => {
    throw new Error('Server is disconnected, could not fetch data. ');
  })
  .then(response => checkStatus(response))
  .then(response => response.json());

export const fetchNodes = fetchNodesFactory({
  getNodes: getNodesFetch,
  fetchRequest: fetchNodesRequest,
  fetchSuccess: fetchNodesSuccess,
  fetchFailure: fetchNodesFailure,
  parseFetchedNodes
});

const postNodeFetch = (text: string) => fetch(DEFAULT_ROUTE, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({text}),
})
  .catch(() => {
    throw new Error('Server is disconnected, could not save text: ' + text + '. ');
  })
  .then(response => checkStatus(response))
  .then((response: any) => response.json());

export const postNode = postNodeFactory({
  postNodeFetch,
  postRequest: postNodeRequest,
  postSuccess: postNodeSuccess,
  postFailure: postNodeFailure,
  parseFetchedNode
});

const deleteNodeFetch = (id: Guid) => fetch(DEFAULT_ROUTE + '/' + id, {
  method: 'DELETE',
  body: JSON.stringify(id),
})
  .catch(() => {
    throw new Error('Server is disconnected, could not delete selected node.');
  })
  .then(response => checkStatus(response));

export const deleteNodeRequest = (): IAction => ({
  type: DELETE_NODE_REQUEST,
});

export const deleteNodeSuccess = (id: Guid): IAction => ({
  type: DELETE_NODE_SUCCESS,
  payload: {
    id,
  },
});

export const deleteNodeFailure = errorFactory(generateId, DELETE_NODE_FAILURE);

export const deleteNodeThunk = deleteNodeFactory({
  deleteNodeRequest,
  deleteNodeFailure,
  deleteNodeSuccess,
  deleteNodeFetch
});
