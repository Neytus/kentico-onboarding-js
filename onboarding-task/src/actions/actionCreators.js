import { ADD_NODE, TOGGLE_NODE, SAVE_NODE, DELETE_NODE } from './actionTypes';
import { generateId } from '../utils/generateId';

export function addNode(text) {
  return {
    type: ADD_NODE,
    id: generateId(),
    text,
  };
}

export function toggleNode(id) {
  return {
    type: TOGGLE_NODE,
    id,
  };
}

export function deleteNode(id) {
  return {
    type: DELETE_NODE,
    id,
  };
}

export function saveNode(id, text) {
  return {
    type: SAVE_NODE,
    id,
    text,
  };
}
