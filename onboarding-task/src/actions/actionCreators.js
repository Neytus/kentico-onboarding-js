import {
  ADD_NODE,
  TOGGLE_NODE,
  SAVE_NODE,
  DELETE_NODE,
} from './actionTypes';
import { generateId } from '../utils/generateId';

export const addNode = text => {
  return {
    type: ADD_NODE,
    id: generateId(),
    text,
  };
};

export const toggleNode = id => {
  return {
    type: TOGGLE_NODE,
    id,
  };
};

export const deleteNode = id => {
  return {
    type: DELETE_NODE,
    id,
  };
};

export const saveNode = (id, text) => {
  return {
    type: SAVE_NODE,
    id,
    text,
  };
};
