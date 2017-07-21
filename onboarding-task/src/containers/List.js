import { connect } from 'react-redux';
import memoize from 'memoizee';

import { List as ListComponent } from '../components/List';

const getNodes = state => state.nodesList.nodes;
export const getMemoizedNodes = memoize(getNodes);

const mapStateToProps = state => ({
  nodeIds: getMemoizedNodes(state).keySeq(),
});

export const List = connect(mapStateToProps)(ListComponent);
