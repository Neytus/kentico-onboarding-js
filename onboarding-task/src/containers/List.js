import { connect } from 'react-redux';

import { List as ListComponent } from '../components/List';

const mapStateToProps = state => ({
  nodeIds: state.nodesList.nodes.keySeq(),
});

export const List = connect(mapStateToProps)(ListComponent);

