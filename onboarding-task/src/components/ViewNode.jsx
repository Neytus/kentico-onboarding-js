import React from 'react';
import PropTypes from 'prop-types';

const ListNode = ({ text, index, onEdit }) => <div onClick={onEdit}>{index}. {text}</div>;

ListNode.displayName = 'ListNode';

ListNode.propTypes = {
  text: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export { ListNode };
