import * as React from 'react';
import { List as ImmutableList } from 'immutable';
const ImmutablePropTypes = require('react-immutable-proptypes');

import { AddNode } from '../containers/AddNode';
import { Node } from '../containers/Node';

export interface IListDataProps {
  nodesIds: ImmutableList<string>;
}

const listPropTypes = {
  nodesIds: ImmutablePropTypes.list.isRequired,
};

export const List: React.StatelessComponent<IListDataProps> = ({nodesIds}) => {
  const nodes = nodesIds
    .map((id: string, index: number) => (
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
        <ul className="list-group">
          {nodes}
          <li className="list-group-item">
            <AddNode />
          </li>
        </ul>
      </div>
    </div>
  );
};

List.displayName = 'List';
List.propTypes = listPropTypes;
