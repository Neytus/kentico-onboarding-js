import { DEFAULT_ROUTE } from '../constants/routes';
import { checkStatus } from '../utils/checkStatus';
import { fetchNodesFactory } from './fetchNodesFactory';
import {
  deleteNodeFailure,
  deleteNodeRequest,
  deleteNodeSuccess,
  fetchNodesFailure,
  fetchNodesRequest,
  fetchNodesSuccess,
  postNodeFailure,
  postNodeOptimistically,
  postNodeRequest,
  postNodeSuccess,
  putNodeFailure,
  putNodeRequest,
  putNodeSuccess
} from './actionCreators';
import { parseFetchedNode, parseFetchedNodes } from '../utils/parseFetchedNodes';
import { postNodeFactory } from './postNodeFactory';
import { deleteNodeFactory } from './deleteNodeFactory';
import { generateId } from '../utils/generateId';
import { INodeContent } from '../models/NodeContent';
import { putNodeFactory } from './putNodeFactory';

const getNodesFetch = () => fetch(DEFAULT_ROUTE)
  .catch(() => {
    throw new Error('Server is disconnected, could not fetch data. ');
  })
  .then(response => checkStatus(response))
  .then(response => response.json());

export const fetchNodes = fetchNodesFactory({
  getNodesFetch: getNodesFetch,
  getNodesRequest: fetchNodesRequest,
  getNodesSuccess: fetchNodesSuccess,
  getNodesFailure: fetchNodesFailure,
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
  .then(response => response.json());

export const postNode = postNodeFactory({
  postNodeFetch,
  postNodeRequest,
  postNodeOptimistically,
  postNodeSuccess,
  postNodeFailure,
  parseFetchedNode,
  idGenerator: generateId,
});

const putNodeFetch = (nodeToUpdate: INodeContent) => fetch(DEFAULT_ROUTE + '/' + nodeToUpdate.id, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(nodeToUpdate),
})
  .catch(() => {
  throw new Error('Server is disconnected, could not update node with text: ' + nodeToUpdate.text + '. ');
})
  .then(response => checkStatus(response))
  .then(response => response.json());

export const putNode = putNodeFactory({
  putNodeRequest,
  putNodeFetch,
  putNodeSuccess,
  putNodeFailure,
});

const deleteNodeFetch = (id: Guid) => fetch(DEFAULT_ROUTE + '/' + id, {
  method: 'DELETE',
  body: JSON.stringify(id),
})
  .catch(() => {
    throw new Error('Server is disconnected, could not delete selected node.');
  })
  .then(response => checkStatus(response));

export const deleteNode = deleteNodeFactory({
  deleteNodeRequest,
  deleteNodeFailure,
  deleteNodeSuccess,
  deleteNodeFetch
});
