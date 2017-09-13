import { connect } from 'react-redux';
import * as React from 'react';

import { addNode, postNode } from '../actions/actionCreators';
import { AddNode as AddNodeComponent, IAddNodeCallbacksProps } from '../components/AddNode';

const mapDispatchToProps = (dispatch: Dispatch): IAddNodeCallbacksProps => ({
  onAdd: (text: string) => {
    dispatch(addNode(text));
    dispatch(postNode(text));
  }
});

export const AddNode: React.ComponentClass = connect(
  null,
  mapDispatchToProps,
)(AddNodeComponent);
