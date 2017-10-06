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
  postNodeSuccess
} from './actionCreators';
import { parseFetchedNode, parseFetchedNodes } from '../utils/parseFetchedNodes';
import { postNodeFactory } from './postNodeFactory';
import { deleteNodeFactory } from './deleteNodeFactory';
import { generateId } from '../utils/generateId';

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
  .then((response: any) => response.json());

export const postNode = postNodeFactory({
  postNodeFetch,
  postNodeRequest,
  postNodeOptimistically,
  postNodeSuccess,
  postNodeFailure,
  parseFetchedNode,
  idGenerator: generateId,
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
