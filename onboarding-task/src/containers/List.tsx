import { connect } from 'react-redux';
import * as React from 'react';

import { List as ListComponent, IListDataProps } from '../components/List';
import { IAppState } from '../reducers/IAppState';
import { fetchNodes, fetchNodesRequest } from '../actions/actionCreators';

const mapStateToProps = ({nodesList: {nodesIds}}: IAppState): IListDataProps => ({
  nodesIds
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchNodes: () => dispatch(fetchNodes()),
  fetchRequest: () => dispatch(fetchNodesRequest())
});

export const List: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(ListComponent);
