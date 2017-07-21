import { connect } from 'react-redux';
import memoize from 'memoizee';

import { List as ListComponent } from '../components/List';

const getSequence = nodes => nodes.keySeq();
export const getMemoizedSequence = memoize(getSequence);

const mapStateToProps = state => ({
  nodeIds: getMemoizedSequence(state.nodesList.nodes),
});

export const List = connect(mapStateToProps)(ListComponent);
