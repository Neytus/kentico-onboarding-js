import React from 'react';
import PropTypes from 'prop-types';

const ListNode = ({ text, index, onEdit }) => {
  return (
    <div onClick={onEdit}>{index}. {text}</div>
  );
};

ListNode.displayName = 'ListNode';

ListNode.propTypes = {
  text: PropTypes.string,
  onEdit: PropTypes.func,
  index: PropTypes.number,
};

export { ListNode };
