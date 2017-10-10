import {
  TOGGLE_NODE,
  GET_NODES_REQUEST,
  GET_NODES_SUCCESS,
  DELETE_ERROR,
  POST_NODE_REQUEST,
  POST_NODE_SUCCESS,
  POST_NODE_FAILURE,
  GET_NODES_FAILURE,
  DELETE_NODE_REQUEST,
  DELETE_NODE_SUCCESS,
  DELETE_NODE_FAILURE,
  POST_NODE_OPTIMISTIC,
  PUT_NODE_REQUEST,
  PUT_NODE_SUCCESS,
  PUT_NODE_FAILURE,
} from './actionTypes';
import { IAction } from './IAction';
import { errorFactory } from './addErrorFactory';
import { generateId } from '../utils/generateId';
import { INodeContent } from '../models/NodeContent';

export const toggleNode = (id: Guid): IAction => ({
  type: TOGGLE_NODE,
  payload: {
    id,
  },
});

export const deleteError = (id: Guid): IAction => ({
  type: DELETE_ERROR,
  payload: {
    id
  }
});

export const fetchNodesRequest = (): IAction => ({
  type: GET_NODES_REQUEST
});

export const fetchNodesSuccess = (nodes: Array<INodeContent>): IAction => ({
  type: GET_NODES_SUCCESS,
  payload: {
    nodes
  }
});

export const fetchNodesFailure = errorFactory(generateId, GET_NODES_FAILURE);

export const postNodeOptimistically = ({id, text }: INodeContent): IAction => ({
  type: POST_NODE_OPTIMISTIC,
  payload: {
    id,
    text,
  }
});

export const postNodeRequest = (): IAction => ({
  type: POST_NODE_REQUEST,
});

export const postNodeSuccess = (temporaryId: Guid, {id, text}: INodeContent): IAction => ({
  type: POST_NODE_SUCCESS,
  payload: {
    id,
    text,
    temporaryId
  }
});

export const postNodeFailure = errorFactory(generateId, POST_NODE_FAILURE);

export const putNodeRequest = (): IAction => ({
  type: PUT_NODE_REQUEST,
});

export const putNodeSuccess = ({id, text}: INodeContent): IAction => ({
  type: PUT_NODE_SUCCESS,
  payload: {
    id,
    text,
  },
});

export const putNodeFailure = errorFactory(generateId, PUT_NODE_FAILURE);

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
