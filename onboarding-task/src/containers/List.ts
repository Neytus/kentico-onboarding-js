import { connect } from 'react-redux';

import { List as ListComponent } from '../components/List';
import { AppState } from '../AppState';

const mapStateToProps = (state: AppState) => ({
  nodesIds: state.nodesList.nodesIds,
});

export const List = connect(mapStateToProps)(ListComponent);
