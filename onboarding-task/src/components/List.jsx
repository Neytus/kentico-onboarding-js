import React, { PureComponent } from 'react';
import { OrderedMap } from 'immutable';
import { AddNode } from './AddNode';
import { createMemoizedNodeViewModels } from '../models/NodeViewModel';
import { generateId } from '../utils/generateId';
import { Node } from './Node';
import { NodeContent } from '../models/NodeContent';
import { NodeInfo } from '../models/NodeInfo';

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
    const newNodeInfos = this.state.nodesInfos.set(newNode.id, new NodeInfo({ isBeingEdited: false }));

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

  _toggleNode = id => {
    const newNodeInfos = this.state.nodesInfos.updateIn(
      [id, 'isBeingEdited'],
      isBeingEdited => !isBeingEdited
    );

    this.setState(() => ({
      nodesInfos: newNodeInfos,
    }));
  };

  _saveNode = (id, text) => {
    this._toggleNode(id);
    const newNodes = this.state.nodes.setIn([id, 'text'], text);

    this.setState(() => ({
      nodes: newNodes,
    }));
  };

  render() {
    const nodeViewModels = createMemoizedNodeViewModels(this.state.nodes, this.state.nodesInfos);

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8 ">
          <ul className="list-group">
            {nodeViewModels.valueSeq().map((viewModel, index) =>
              (<li className="list-group-item" key={index}>
                <Node
                  nodeModel={viewModel}
                  onSave={this._saveNode}
                  onToggle={this._toggleNode}
                  onDelete={this._deleteNode}
                />
              </li>)
            )}
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
