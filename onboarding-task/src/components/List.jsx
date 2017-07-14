import React, { PureComponent } from 'react';
const memoize = require('memoizee');

import * as actions from '../actions/actionCreators';
import { AddNode } from './AddNode';
import { createNodeViewModel } from '../models/NodeViewModel';
import { generateId } from '../utils/generateId';
import { Node } from './Node';

const createMemoizedViewModel = memoize(createNodeViewModel);

class List extends PureComponent {
  static displayName = 'List';

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _addNode = text => {
    const { store } = this.context;
    store.dispatch(actions.addNode(generateId(), text));
  };

  _deleteNode = id => {
    const { store } = this.context;
    store.dispatch(actions.deleteNode(id));
  };

  _onToggle = id => {
    const { store } = this.context;
    store.dispatch(actions.toggleNode(id));
  };

  _onSave = (id, text) => {
    const { store } = this.context;
    store.dispatch(actions.saveNode(id, text));
  };

  _createNodes = store =>
    store.getState().nodesList.nodes
      .keySeq()
      .map((id, index) => (
        <li className="list-group-item" key={id}>
          <Node
            nodeModel={createMemoizedViewModel(store.getState().nodesList.nodes.get(id), store.getState().nodesList.nodesInfos.get(id), index)}
            onSave={this._onSave}
            onToggle={this._onToggle}
            onDelete={this._deleteNode}
          />
        </li>)
      );

  render() {
    const { store } = this.context;
    const nodes = this._createNodes(store);

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8 ">
          <ul className="list-group">
            {nodes}
            <li className="list-group-item">
              <AddNode onAdd={this._addNode} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

List.contextTypes = {
  store: React.PropTypes.object,
};

export { List };
