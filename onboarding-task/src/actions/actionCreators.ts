import {
  TOGGLE_NODE,
  SAVE_NODE,
  DELETE_NODE,
  FETCH_NODES_REQUEST,
  FETCH_NODES_SUCCESS,
  FETCH_NODES_FAILURE,
  DELETE_ERROR,
  POST_NODE_REQUEST,
  POST_NODE_SUCCESS,
  POST_NODE_FAILURE
} from './actionTypes';
import { addNodeFactory } from './addNodeFactory';
import { generateId } from '../utils/generateId';
import { IAction } from './IAction';
import { DEFAULT_ROUTE } from '../constants/routes';

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

export const postNodeFailure = (text: string): IAction => ({
  type: POST_NODE_FAILURE,
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

const parseFetchedNodes = (nodes: Array<IFetchedNode>): Array<IFetchedNode> => nodes.map(({id, text}) => ({id, text}));

export const fetchNodes = (): any =>
  (dispatch: Dispatch) => {
    dispatch(fetchNodesRequest());
    return fetch(DEFAULT_ROUTE)
      .then((response) => response.json())
      .then((json) => parseFetchedNodes(json))
      .then((nodes) => dispatch(fetchNodesSuccess(nodes)))
      .catch(() => {
        return dispatch(fetchNodesFailure('Error: Cannot fetch data from the database.'));
      });
  };

export const postNode = (text: string): any =>
  (dispatch: any) => {
    dispatch(postNodeRequest());
    return fetch(DEFAULT_ROUTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text}),
    })
      .then((response) => response.json())
      .then((json: IFetchedNode) => dispatch(postNodeSuccess({id: json.id, text: json.text})))
      .catch(() => {
        return dispatch(postNodeFailure('Cannot post data to the database.'));
      });
  };
