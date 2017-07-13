import {
  ADD_NODE,
  TOGGLE_NODE,
  SAVE_NODE,
  DELETE_NODE,
} from './actionTypes';

export const addNode = (id, text) => {
  return {
    type: ADD_NODE,
    payload: {
      id,
      text,
    },
  };
};

export const toggleNode = id => {
  return {
    type: TOGGLE_NODE,
    payload: {
      id,
    },
  };
};

export const deleteNode = id => {
  return {
    type: DELETE_NODE,
    payload: {
      id,
    },
  };
};

export const saveNode = (id, text) => {
  return {
    type: SAVE_NODE,
    payload: {
      id,
      text,
    },
  };
};
