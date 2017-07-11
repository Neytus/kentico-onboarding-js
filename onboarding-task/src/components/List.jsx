import React, { PureComponent } from 'react';
import { OrderedMap } from 'immutable';
import { AddNode } from './AddNode';
import { Node } from './Node';
import { NodeContent } from '../models/NodeContent';
import { NodeInfo } from '../models/NodeInfo';
import { _createNodeViewModel } from '../models/NodeViewModel';
import { generateId } from '../utils/generateId';

const memoize = require('memoizee');
const createViewModel = memoize(_createNodeViewModel);

class List extends PureComponent {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      nodes: OrderedMap(),
      nodeInfos: OrderedMap(),
    };
  }

  _addNode = text => {
    const newNode = new NodeContent({ id: generateId(), text });
    const newNodes = this.state.nodes.set(newNode.id, newNode);
    const newNodeInfos = this.state.nodeInfos.set(newNode.id, new NodeInfo());

    this.setState(() => ({
      nodes: newNodes,
      nodeInfos: newNodeInfos,
    }));
  };

  _deleteNode = id => {
    const newNodes = this.state.nodes.delete(id);
    const newNodeInfos = this.state.nodeInfos.delete(id);

    this.setState(() => ({
      nodes: newNodes,
      nodeInfos: newNodeInfos,
    }));
  };

  _onToggle = id => {
    const newNodeInfos = this.state.nodeInfos.updateIn(
      [id, 'isBeingEdited'],
      isBeingEdited => !isBeingEdited
    );

    this.setState(() => ({
      nodeInfos: newNodeInfos,
    }));
  };

  _onSave = (id, text) => {
    this._onToggle(id);
    const newNodes = this.state.nodes.setIn([id, 'text'], text);

    this.setState(() => ({
      nodes: newNodes,
    }));
  };

  _createViewModelMap = createModel => {
    return this.state.nodes.keySeq().map((key, index) => {
      const nodeViewModel = createModel(this.state.nodes.get(key), this.state.nodeInfos.get(key), index);
      return (<li className="list-group-item" key={nodeViewModel.id}>
        <Node
          nodeModel={nodeViewModel}
          onSave={this._onSave}
          onToggle={this._onToggle}
          onDelete={this._deleteNode}
        />
      </li>);
    });
  };

  render() {
    const nodes = this._createViewModelMap(createViewModel);

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
