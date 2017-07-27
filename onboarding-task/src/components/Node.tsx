import * as React from 'react';
import * as PropTypes from 'prop-types';
const ImmutablePropTypes = require('react-immutable-proptypes');

import { EditableNode } from './EditableNode';
import { ViewNode } from './ViewNode';
import { INodeViewModel } from '../models/NodeViewModel';

export interface INodeDataProps {
  nodeViewModel: INodeViewModel;
}

export interface INodeCallbacksProps {
  onEdit: () => void;
  onSave: (text: string) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const nodePropTypes = {
  nodeViewModel: ImmutablePropTypes.recordOf({
    id: PropTypes.string.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export const Node: React.StatelessComponent<INodeDataProps & INodeCallbacksProps> =
  ({
     nodeViewModel,
     onEdit,
     onCancel,
     onDelete,
     onSave
   }) => {

    return nodeViewModel.isBeingEdited ? (
      <EditableNode
        nodeViewModel={nodeViewModel}
        onCancel={onCancel}
        onSave={onSave}
        onDelete={onDelete}
      />
    ) : (
      <ViewNode
        nodeViewModel={nodeViewModel}
        onEdit={onEdit}
      />
    );
  };

Node.displayName = 'Node';
Node.propTypes = nodePropTypes;
