import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

const viewNodePropTypes = {
  nodeModel: ImmutablePropTypes.recordOf({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

const ViewNode = ({ onEdit, nodeModel }) => <div onClick={onEdit}>{nodeModel.index}. {nodeModel.text}</div>;

ViewNode.displayName = 'ViewNode';
ViewNode.propTypes = viewNodePropTypes;

export { ViewNode };
