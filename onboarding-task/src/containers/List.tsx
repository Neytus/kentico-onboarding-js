import { connect } from 'react-redux';
import * as React from 'react';

import { List as ListComponent, IListDataProps } from '../components/List';
import { IAppState } from '../reducers/IAppState';
import { fetchNodesRequest } from '../actions/actionCreators';

const mapStateToProps = ({nodesList: {nodesIds, isFetching}}: IAppState): IListDataProps => ({
  nodesIds,
  isFetching
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchNodes: () => dispatch(fetchNodesRequest()),
});

export const List: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(ListComponent);
