import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { EditableNode } from './EditableNode';
import { ViewNode } from './ViewNode';

const Node = props => {
  const { nodeViewModel } = props;
  return nodeViewModel.isBeingEdited ? (
    <EditableNode
      nodeViewModel={nodeViewModel}
      onCancel={props.onCancel}
      onSave={props.onSave}
      onDelete={props.onDelete}
    />
  ) : (
    <ViewNode
      nodeViewModel={nodeViewModel}
      onEdit={props.onEdit}
    />
  );
};

Node.displayName = 'Node';
Node.propTypes = {
  nodeViewModel: ImmutablePropTypes.recordOf({
    id: PropTypes.string.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export { Node };
