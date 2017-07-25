import { connect } from 'react-redux';

import { Node as NodeComponent } from '../components/Node';
import { createMemoizedNodeViewModel } from '../models/NodeViewModel.ts';
import * as actions from '../actions/actionCreators.ts';

const mapStateToProps = ({ nodesList: { nodes, nodesInfo } }, { listProp: { id, index } }) => ({
  nodeViewModel: createMemoizedNodeViewModel(nodes.get(id), nodesInfo.get(id), index),
});

const mapDispatchToProps = (dispatch, { listProp: { id } }) => ({
  onEdit: () => dispatch(actions.toggleNode(id)),
  onSave: text => dispatch(actions.saveNode(id, text)),
  onCancel: () => dispatch(actions.toggleNode(id)),
  onDelete: () => dispatch(actions.deleteNode(id)),
});

export const Node = connect(mapStateToProps, mapDispatchToProps)(NodeComponent);
