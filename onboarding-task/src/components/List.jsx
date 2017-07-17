import React from 'react';
import PropTypes from 'prop-types';
const memoize = require('memoizee');

import { AddNodeContainer } from '../containers/AddNode';
import { createNodeViewModel } from '../models/NodeViewModel';
import { Node } from './Node';

const createMemoizedViewModel = memoize(createNodeViewModel);

const List = state => {
  const nodes = state.nodesList.nodes
    .keySeq()
    .map((id, index) => (
      <li className="list-group-item" key={id}>
        <Node
          nodeModel={createMemoizedViewModel(state.nodesList.nodes.get(id), state.nodesList.nodesInfos.get(id), index)}
        />
      </li>)
    );

  return (
    <div className="row">
      <div className="col-sm-12 col-md-offset-2 col-md-8 ">
        <ul className="list-group">
          {nodes}
          <li className="list-group-item">
            <AddNodeContainer />
          </li>
        </ul>
      </div>
    </div>
  );
};

List.propTypes = {
  nodesList: PropTypes.object.isRequired,
};

export { List };
