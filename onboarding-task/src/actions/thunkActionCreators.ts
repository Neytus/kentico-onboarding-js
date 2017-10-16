import { API_ROUTE } from '../constants/routes';
import { checkStatus } from '../utils/checkStatus';
import { getNodesFactory } from './getNodesFactory';
import {
  deleteNodeFailure,
  deleteNodeStart,
  deleteNodeSuccess,
  getNodesFailure,
  getNodesStart,
  getNodesSuccess,
  addNodeFailure,
  addNodeOptimistically,
  addNodeStart,
  addNodeSuccess,
  updateNodeFailure,
  updateNodeStart,
  updateNodeSuccess
} from './actionCreators';
import { parseFetchedNode, parseFetchedNodes } from '../utils/parseFetchedNodes';
import { addNodeFactory } from './addNodeFactory';
import { deleteNodeFactory } from './deleteNodeFactory';
import { generateId } from '../utils/generateId';
import { INodeContent } from '../models/NodeContent';
import { updateNodeFactory } from './updateNodeFactory';

const getNodesFetch = () => fetch(API_ROUTE)
  .catch(() => {
    throw new Error('Server is disconnected, could not fetch data. ');
  })
  .then(response => checkStatus(response))
  .then(response => response.json());

export const getNodes = getNodesFactory({
  getNodesFetch,
  getNodesStart,
  getNodesSuccess,
  getNodesFailure,
  parseFetchedNodes
});

const addNodeFetch = (text: string) => fetch(API_ROUTE, {
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
  .then(response => response.json());

export const addNode = addNodeFactory({
  addNodeFetch,
  addNodeStart,
  addNodeOptimistically,
  addNodeSuccess,
  addNodeFailure,
  parseFetchedNode,
  idGenerator: generateId,
});

const updateNodeFetch = ({id, text}: INodeContent) => fetch(API_ROUTE + '/' + id, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text
  }),
})
  .catch(() => {
    throw new Error('Server is disconnected, could not update node with text: ' + text + '. ');
  })
  .then(response => checkStatus(response))
  .then(response => response.json());

export const updateNode = updateNodeFactory({
  updateNodeStart,
  updateNodeFetch,
  updateNodeSuccess,
  updateNodeFailure,
});

const deleteNodeFetch = (id: Guid) => fetch(API_ROUTE + '/' + id, {
  method: 'DELETE',
  body: JSON.stringify(id),
})
  .catch(() => {
    throw new Error('Server is disconnected, could not delete selected node.');
  })
  .then(response => checkStatus(response));

export const deleteNode = deleteNodeFactory({
  deleteNodeStart,
  deleteNodeFailure,
  deleteNodeSuccess,
  deleteNodeFetch
});
