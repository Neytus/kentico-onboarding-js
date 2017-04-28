import { PropTypes } from 'react';
import { Record } from 'immutable';

export const Item = new Record({
  id: '',
  textSaved: '',
  textShown: '',
  isEditing: false,
});

Item.propTypes = {
  id: PropTypes.string.isRequired,
  textSaved: PropTypes.string.isRequired,
  textShown: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
};
