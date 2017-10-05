import { connect } from 'react-redux';
import * as React from 'react';

import { INodeCallbacksProps, INodeDataProps, Node as NodeComponent } from '../components/Node';
import { createMemoizedNodeViewModel } from '../models/NodeViewModel';
import * as actions from '../actions/actionCreators';
import { IAppState } from '../reducers/IAppState';
import { deleteNode } from '../actions/thunkActionCreators';

interface INodeContainerProps {
  id: Guid;
  index: number;
}

const mapStateToProps = ({nodesList: {nodes, nodesInfo}}: IAppState, {id, index}: INodeContainerProps): INodeDataProps => ({
  nodeViewModel: createMemoizedNodeViewModel(nodes.get(id), nodesInfo.get(id), index),
});

const mapDispatchToProps = (dispatch: Dispatch, {id}: INodeContainerProps): INodeCallbacksProps => ({
  onEdit: () => dispatch(actions.toggleNode(id)),
  onSave: (text: string) => dispatch(actions.saveNode(id, text)),
  onCancel: () => dispatch(actions.toggleNode(id)),
  onDelete: () => dispatch(deleteNode(id)),
});

export const Node: React.ComponentClass<INodeContainerProps> = connect(mapStateToProps, mapDispatchToProps)(NodeComponent);
