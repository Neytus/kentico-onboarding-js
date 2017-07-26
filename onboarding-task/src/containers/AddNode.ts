import { connect } from 'react-redux';

import { addNode } from '../actions/actionCreators';
import { AddNode as AddNodeComponent, IAddNodeCallbacksProps } from '../components/AddNode';
import { Dispatch } from '../reducers/AppState';

const mapDispatchToProps = (dispatch: Dispatch): IAddNodeCallbacksProps => ({
  onAdd: (text: string) => dispatch(addNode(text)),
});

export const AddNode = connect(
  null,
  mapDispatchToProps,
)(AddNodeComponent);
