import React, { PureComponent } from 'react';
import { OrderedMap } from 'immutable';
import { Adder } from './Adder';
import { NodeContent } from '../models/NodeContent';
import { Node } from './Node';
import { generateId } from '../utils/generateId';

class List extends PureComponent {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      nodes: OrderedMap(),
    };
  }

  _addNode = text => {
    const newNode = new NodeContent({ id: generateId(), text });
    const newNodes = this.state.nodes.set(newNode.id, newNode);

    this.setState(() => ({
      nodes: newNodes,
    }));
  };

  _deleteNode = id => {
    const newNodes = this.state.nodes.delete(id);

    this.setState(() => ({
      nodes: newNodes,
    }));
  };

  _onToggleOrUpdate = (id, text) => {
    const chosenNode = this.state.nodes.get(id);
    const updatedNode = new NodeContent({
      id: chosenNode.id,
      isBeingEdited: !chosenNode.isBeingEdited,
      text,
    });
    const newNodesMap = this.state.nodes.set(chosenNode.id, updatedNode);

    this.setState(() => ({
      nodes: newNodesMap,
    }));
  };

  render() {
    const nodes = this.state.nodes
      .valueSeq()
      .map((node, index) =>
        <li className="list-group-item" key={node.id}>
          <Node
            id={node.id}
            index={index + 1}
            text={node.text}
            isBeingEdited={node.isBeingEdited}
            onSave={this._onToggleOrUpdate}
            onDelete={this._deleteNode}
          />
        </li>);

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8 ">
          <ul className="list-group">
            {nodes}
            <li className="list-group-item">
              <Adder onAdd={this._addNode} />
            </li>
          </ul>
        </div>
      </div>
    );
  }

}

export { List };
