import React, { PureComponent } from 'react';
import { createStore } from 'redux';
import { OrderedMap } from 'immutable';
const memoize = require('memoizee');

import { AddNode } from './AddNode';
import { createNodeViewModel } from '../models/NodeViewModel';
import { generateId } from '../utils/generateId';
import { Node } from './Node';
import { NodeContent } from '../models/NodeContent';
import { NodeInfo } from '../models/NodeInfo';

const createMemoizedViewModel = memoize(createNodeViewModel);

// let store = createStore( combineReducers );

class List extends PureComponent {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      nodes: OrderedMap(),
      nodesInfos: OrderedMap(),
    };
  }

  _addNode = text => {
    const newNode = new NodeContent({
      id: generateId(),
      text,
    });
    const newNodes = this.state.nodes.set(newNode.id, newNode);
    const newNodeInfos = this.state.nodesInfos.set(newNode.id, new NodeInfo());

    this.setState(() => ({
      nodes: newNodes,
      nodesInfos: newNodeInfos,
    }));
  };

  _deleteNode = id => {
    const newNodes = this.state.nodes.delete(id);
    const newNodeInfos = this.state.nodesInfos.delete(id);

    this.setState(() => ({
      nodes: newNodes,
      nodesInfos: newNodeInfos,
    }));
  };

  _onToggle = id => {
    const newNodeInfos = this.state.nodesInfos.updateIn(
      [id, 'isBeingEdited'],
      isBeingEdited => !isBeingEdited
    );

    this.setState(() => ({
      nodesInfos: newNodeInfos,
    }));
  };

  _onSave = (id, text) => {
    this._onToggle(id);
    const newNodes = this.state.nodes.setIn([id, 'text'], text);

    this.setState(() => ({
      nodes: newNodes,
    }));
  };

  _createNodes = () =>
    this.state.nodes
      .keySeq()
      .map((id, index) => (
        <li className="list-group-item" key={id}>
          <Node
            nodeModel={createMemoizedViewModel(this.state.nodes.get(id), this.state.nodesInfos.get(id), index)}
            onSave={this._onSave}
            onToggle={this._onToggle}
            onDelete={this._deleteNode}
          />
        </li>)
      );

  render() {
    const nodes = this._createNodes();

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

export { List };
