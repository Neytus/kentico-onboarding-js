import { INodeCallbacksProps, INodeDataProps, Node as NodeComponent } from '../components/Node';
import { createMemoizedNodeViewModel } from '../models/NodeViewModel';
import * as actions from '../actions/actionCreators';
import { AppState } from '../AppState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import { IAction } from '../actions/actionCreators';

interface INodeContainerProps {
  id: string;
  index: number;
}

const mapStateToProps = (state: AppState, ownProps: INodeContainerProps): INodeDataProps => ({
  nodeViewModel: createMemoizedNodeViewModel(
    state.nodesList.nodes.get(ownProps.id),
    state.nodesList.nodesInfo.get(ownProps.id),
    ownProps.index),
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>, ownProps: INodeContainerProps): INodeCallbacksProps => ({
  onEdit: () => dispatch(actions.toggleNode(ownProps.id)),
  onSave: (text: string) => dispatch(actions.saveNode(ownProps.id, text)),
  onCancel: () => dispatch(actions.toggleNode(ownProps.id)),
  onDelete: () => dispatch(actions.deleteNode(ownProps.id)),
});

export const Node: React.ComponentClass<INodeContainerProps> = connect(mapStateToProps, mapDispatchToProps)(NodeComponent);
