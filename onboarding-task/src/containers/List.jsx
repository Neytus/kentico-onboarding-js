import { connect } from 'react-redux';
import { List } from '../components/List';

const mapStateToProps = (state) => {
  return {
    nodesList: state.nodesList,
  };
};

export const ListContainer = connect(
  mapStateToProps,
)(List);

