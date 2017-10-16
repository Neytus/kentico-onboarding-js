import {
  TOGGLE_NODE,
  GET_NODES_REQUEST,
  GET_NODES_SUCCESS,
  DISMISS_ERROR,
  ADD_NODE_REQUEST,
  ADD_NODE_SUCCESS,
  ADD_NODE_FAILURE,
  GET_NODES_FAILURE,
  DELETE_NODE_REQUEST,
  DELETE_NODE_SUCCESS,
  DELETE_NODE_FAILURE,
  ADD_NODE_OPTIMISTIC,
  UPDATE_NODE_REQUEST,
  UPDATE_NODE_SUCCESS,
  UPDATE_NODE_FAILURE,
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

export const dismissError = (id: Guid): IAction => ({
  type: DISMISS_ERROR,
  payload: {
    id
  }
});

export const getNodesRequest = (): IAction => ({
  type: GET_NODES_REQUEST
});

export const getNodesSuccess = (nodes: Array<INodeContent>): IAction => ({
  type: GET_NODES_SUCCESS,
  payload: {
    nodes
  }
});

export const getNodesFailure = errorFactory(generateId, GET_NODES_FAILURE);

export const addNodeOptimistically = ({id, text }: INodeContent): IAction => ({
  type: ADD_NODE_OPTIMISTIC,
  payload: {
    id,
    text,
  }
});

export const addNodeRequest = (): IAction => ({
  type: ADD_NODE_REQUEST,
});

export const addNodeSuccess = (temporaryId: Guid, {id, text}: INodeContent): IAction => ({
  type: ADD_NODE_SUCCESS,
  payload: {
    id,
    text,
    temporaryId
  }
});

export const addNodeFailure = errorFactory(generateId, ADD_NODE_FAILURE);

export const updateNodeRequest = (): IAction => ({
  type: UPDATE_NODE_REQUEST,
});

export const updateNodeSuccess = ({id, text}: INodeContent): IAction => ({
  type: UPDATE_NODE_SUCCESS,
  payload: {
    id,
    text,
  },
});

export const updateNodeFailure = errorFactory(generateId, UPDATE_NODE_FAILURE);

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
