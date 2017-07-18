import { connect } from 'react-redux';
import { toggleNode } from '../actions/actionCreators';
import { ViewNode as ViewNodeComponent } from '../components/ViewNode';

const mapDispatchToProps = (dispatch) => {
  return {
    onEdit: id => dispatch(toggleNode(id)),
  };
};

export const ViewNode = connect(
  null,
  mapDispatchToProps,
)(ViewNodeComponent);
