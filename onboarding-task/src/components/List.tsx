const ImmutablePropTypes = require('react-immutable-proptypes');
const Loading = require('react-loading-animation');
import * as React from 'react';
import { List as ImmutableList, OrderedMap } from 'immutable';
import { HotKeys } from 'react-hotkeys';

import { Error } from '../containers/Error';
import { AddNode } from '../containers/AddNode';
import { Node } from '../containers/Node';
import { IKeyMap } from '../@types/IKeyMap';

export interface IListDataProps {
  nodesIds: ImmutableList<IdType>;
  isFetching: boolean;
  errors: OrderedMap<IdType, string>;
}

export interface  IListCallbacksProps {
  fetchNodes: any;
}

const keyMap: IKeyMap = {
  'cancelNode': 'esc',
  'saveNode': 'enter',
};

export class List extends React.PureComponent<IListDataProps & IListCallbacksProps> {
  static displayName = 'List';
  static propTypes = {
    nodesIds: ImmutablePropTypes.list.isRequired,
  };

  constructor(props: IListDataProps & IListCallbacksProps) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchNodes();
  }

  render() {
    const
      nodes = this.props.nodesIds
        .map((id: IdType, index: number) => (
          <li className="list-group-item" key={id}>
            <Node
              id={id}
              index={index}
            />
          </li>
        ));

    const
      errors = this.props.errors.keySeq()
        .map((id: IdType) => (
          <li className="list-group-item" key={id}>
            <Error id={id}/>
          </li>
        ));

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8 ">
          <Loading isLoading={this.props.isFetching}>
            <ul className="list-group">
              <HotKeys keyMap={keyMap}>
                {nodes}
                {errors}
                <li className="list-group-item">
                  <AddNode />
                </li>
              </HotKeys>
            </ul>
          </Loading>
        </div>
      </div>
    );
  }
}
