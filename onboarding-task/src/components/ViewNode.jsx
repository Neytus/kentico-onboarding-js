import React from 'react';
import PropTypes from 'prop-types';

const viewNodePropTypes = {
  onEdit: PropTypes.func.isRequired,
  nodeModel: PropTypes.shape({
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
};

const ViewNode = ({ nodeModel, onEdit }) => <div onClick={onEdit}>{nodeModel.index}. {nodeModel.text}</div>;

ViewNode.displayName = 'ViewNode';
ViewNode.propTypes = viewNodePropTypes;

export { ViewNode };
