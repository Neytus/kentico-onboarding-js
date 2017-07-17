import React from 'react';
import PropTypes from 'prop-types';
import { EditableNodeContainer } from '../containers/EditableNode';
import { ViewNodeContainer } from '../containers/ViewNode';

const Node = nodeModel => {
  return nodeModel.nodeModel.isBeingEdited ? (
    <EditableNodeContainer
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
