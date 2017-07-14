import { connect } from 'react-redux';
import { toggleNode } from '../actions/actionCreators';
import { ViewNode } from '../components/ViewNode';

const mapDispatchToProps = (dispatch) => {
  return {
    onEdit: id => dispatch(toggleNode(id)),
  };
};

export const ViewNodeContainer = connect(
  null,
  mapDispatchToProps,
)(ViewNode);
