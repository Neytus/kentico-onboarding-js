const ImmutablePropTypes = require('react-immutable-proptypes');
const Loading = require('react-loading-animation');
import * as React from 'react';
import { List as ImmutableList } from 'immutable';
import { HotKeys } from 'react-hotkeys';

import { AddNode } from '../containers/AddNode';
import { Node } from '../containers/Node';
import { IKeyMap } from '../@types/IKeyMap';

export interface IListDataProps {
  nodesIds: ImmutableList<IdType>;
  isFetching: boolean;
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

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8 ">
          <Loading isLoading={this.props.isFetching}>
            <ul className="list-group">
              <HotKeys keyMap={keyMap}>
                {nodes}
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
