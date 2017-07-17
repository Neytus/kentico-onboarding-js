import { connect } from 'react-redux';
import * as actions from '../actions/actionCreators';
import { EditableNode } from '../components/EditableNode';
import { isNullOrWhitespace } from '../utils/validation';

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (id, text) => {
      dispatch(actions.saveNode(id, text));
    },
    onCancel: id => {
      dispatch(actions.toggleNode(id));
    },
    onDelete: id => {
      dispatch(actions.deleteNode(id));
    },
    disabled: text => {
      return isNullOrWhitespace(text);
    },
  };
};

const EditableNodeContainer = connect(
  null,
  mapDispatchToProps,
)(EditableNode);

export { EditableNodeContainer };
