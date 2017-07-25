import { connect } from 'react-redux';
import * as React from 'react';

import { List as ListComponent, IListDataProps } from '../components/List';
import { AppState } from '../AppState';


const mapStateToProps = (state: AppState): IListDataProps => ({
  nodesIds: state.nodesList.nodesIds,
});

export const List: React.ComponentClass = connect(mapStateToProps)(ListComponent);
