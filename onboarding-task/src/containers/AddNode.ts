import { connect } from 'react-redux';

import { addNode } from '../actions/actionCreators.ts';
import { AddNode as AddNodeComponent } from '../components/AddNode';

const mapDispatchToProps = dispatch => ({
  onAdd: text => dispatch(addNode(text)),
});

export const AddNode = connect(
  null,
  mapDispatchToProps,
)(AddNodeComponent);
