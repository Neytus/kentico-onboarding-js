import {
  TOGGLE_NODE,
  SAVE_NODE,
  DELETE_NODE,
  FETCH_NODES_REQUEST,
  FETCH_NODES_SUCCESS,
  FETCH_NODES_FAILURE,
  DELETE_ERROR
} from './actionTypes';
import { addNodeFactory } from './addNodeFactory';
import { generateId } from '../utils/generateId';
import { IAction } from './IAction';

export const addNode = addNodeFactory(generateId);

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

export const fetchNodesFailure = (text: string): IAction => ({
  type: FETCH_NODES_FAILURE,
  payload: {
    text
  }
});

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

const parseNodes = (nodes: Array<IFetchedNode>): Array<IFetchedNode> => {
  return nodes.map(({id, text}) => ({id, text}));
};

export const fetchNodes = (): any =>
  (dispatch: Dispatch) => {
    dispatch(fetchNodesRequest());
    return fetch('api/v1/nodes')
      .then((response) => response.json())
      .then((json) => parseNodes(json))
      .then((nodes) => dispatch(fetchNodesSuccess(nodes)))
      .catch(() => {
        return dispatch(fetchNodesFailure('Error: Cannot fetch data from the database.'));
      });
  };
