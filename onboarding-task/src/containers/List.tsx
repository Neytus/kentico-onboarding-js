import { connect } from 'react-redux';
import * as React from 'react';

import { List as ListComponent, IListDataProps } from '../components/List';
import { IAppState } from '../reducers/IAppState';
import { fetchNodes } from '../actions/actionCreators';

const mapStateToProps = ({nodesList: {nodesIds, isFetching, errors}}: IAppState): IListDataProps => ({
  nodesIds,
  isFetching,
  errors
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchNodes: () => setTimeout(() => dispatch(fetchNodes as any), 2500),
});

export const List: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(ListComponent);
