import { connect } from 'react-redux';
import * as React from 'react';

import { List as ListComponent, IListDataProps, IListCallbacksProps } from '../components/List';
import { IAppState } from '../reducers/IAppState';
import { fetchNodes } from '../actions/thunkActionCreators';

const mapStateToProps = ({nodesList: {nodesIds, isFetching, errors}}: IAppState): IListDataProps => ({
  nodesIds,
  isFetching,
  errors
});

const mapDispatchToProps = (dispatch: Dispatch): IListCallbacksProps => ({
  fetchNodes: () => setTimeout(() => dispatch(fetchNodes()), 2500),
});

export const List: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(ListComponent);
