import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';

const mapStateToProps = store => {
  return {
    nodesList: store.nodesList,
  };
};

export const List = connect(
  mapStateToProps,
)(ListComponent);

