import React from 'react';
import PropTypes from 'prop-types';

const ListNode = ({ text, index, onEdit }) => {
  // TODO Warning zbav sa ho
  const displayName = 'ListNode';

  return (
    <div onClick={onEdit}>{index}. {text}</div>
  );
};

ListNode.propTypes = {
  text: PropTypes.string,
  onEdit: PropTypes.func,
  index: PropTypes.number,
};

export { ListNode };
