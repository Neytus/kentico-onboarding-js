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
} from './baseActionCreators';
import { parseFetchedNode, parseFetchedNodes } from '../utils/parseFetchedNodes';
import { addNodeFactory } from './addNodeFactory';
import { deleteNodeFactory } from './deleteNodeFactory';
import { generateId } from '../utils/generateId';
import { updateNodeFactory } from './updateNodeFactory';
import {
  addNodeFetch,
  deleteNodeFetch,
  getNodesFetch,
  updateNodeFetch,
} from './internalActionCreators/apiAdapter';

export const getNodes = getNodesFactory({
  getNodesFetch,
  getNodesStart,
  getNodesSuccess,
  getNodesFailure,
  parseFetchedNodes
});

export const addNode = addNodeFactory({
  addNodeFetch,
  addNodeStart,
  addNodeOptimistically,
  addNodeSuccess,
  addNodeFailure,
  parseFetchedNode,
  idGenerator: generateId,
});

export const updateNode = updateNodeFactory({
  updateNodeStart,
  updateNodeFetch,
  updateNodeSuccess,
  updateNodeFailure,
});

export const deleteNode = deleteNodeFactory({
  deleteNodeStart,
  deleteNodeFailure,
  deleteNodeSuccess,
  deleteNodeFetch
});
