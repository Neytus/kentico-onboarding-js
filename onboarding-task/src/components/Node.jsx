import React from 'react';
import PropTypes from 'prop-types';
import { EditableNode } from './EditableNode';
import { ViewNodeContainer } from '../containers/ViewNode';

const Node = nodeModel => {
  return nodeModel.nodeModel.isBeingEdited ? (
    <EditableNode
      nodeModel={nodeModel.nodeModel}
    />
  ) : (
    <ViewNodeContainer
      nodeModel={nodeModel.nodeModel}
    />
  );
};

Node.propTypes = {
  nodeModel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
};

export { Node };
