import React from 'react';
import PropTypes from 'prop-types';

import { EditableNode } from '../containers/EditableNode';
import { ViewNode } from '../containers/ViewNode';

const Node = nodeModel => {
  return nodeModel.nodeModel.isBeingEdited ? (
    <EditableNode
      nodeModel={nodeModel.nodeModel}
    />
  ) : (
    <ViewNode
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
