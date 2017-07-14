import { connect } from 'react-redux';
import { addNode } from '../actions/actionCreators';
import { AddNode } from '../components/AddNode';
import { generateId } from '../utils/generateId';
import { isNullOrWhitespace } from '../utils/validation';

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: text => {
      const id = generateId();
      dispatch(addNode(id, text));
    },
    disabled: text => {
      return isNullOrWhitespace(text);
    },
  };
};

const AddNodeContainer = connect(
  null,
  mapDispatchToProps,
)(AddNode);

export { AddNodeContainer };
