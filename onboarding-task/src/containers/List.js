import { connect } from 'react-redux';

import { List as ListComponent } from '../components/List';

const mapStateToProps = state => {
  return {
    nodeIds: state.nodesList.nodes.keySeq().toArray(),
  };
};

export const List = connect(mapStateToProps)(ListComponent);

