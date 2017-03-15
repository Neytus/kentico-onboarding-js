import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import { OrderedSet } from 'immutable';

import { Item } from '../containers/Item';
import { AddForm } from './AddForm';
import {IAction} from '../actions/IAction';

interface IListProps {
  itemIds: OrderedSet<string>;
  addItem: (text: string) => IAction;
}

class List extends React.PureComponent<IListProps, undefined> {
  static displayName = 'List';

  static propTypes = {
    itemIds: ImmutablePropTypes.orderedSetOf(React.PropTypes.string).isRequired,
    addItem: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ul className="list-group">
            {this.props.itemIds.valueSeq().map((id: string, index: number) =>
              <li className="list-group-item" key={id}>
                <Item index={index} id={id} />
              </li>
            )}
            <li className="list-group-item">
              <AddForm onAdd={this.props.addItem} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export { List };
