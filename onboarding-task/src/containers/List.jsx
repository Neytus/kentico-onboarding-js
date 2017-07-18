import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';

const mapStateToProps = state => {
  return {
    nodesList: state.nodesList,
  };
};

export const List = connect(
  mapStateToProps,
)(ListComponent);

