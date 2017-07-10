import React, { PureComponent } from 'react';
import { OrderedMap } from 'immutable';
import { Adder } from './Adder';
import { Item } from './Item';
import { Node } from './Node';
import { generateId } from '../utils/generateId';

class List extends PureComponent {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      nodesMap: OrderedMap(),
    };
  }

  _addNode = text => {
    const generatedId = generateId();
    const newImtNode = new Item({ id: generatedId, text });
    const newNodesMap = this.state.nodesMap.set(newImtNode.id, newImtNode);

    this.setState(() => ({
      nodesMap: newNodesMap,
    }));
  };

  _deleteNode = id => {
    const newNodesMap = this.state.nodesMap.delete(id);
    this.setState(() => ({
      nodesMap: newNodesMap,
    }));
  };

  _onUpdateText = (id, text) => {
    const chosenNode = this.state.nodesMap.get(id);
    const updatedNode = new Item({
      id: chosenNode.id,
      isBeingEdited: false,
      text,
    });
    const newNodesMap = this.state.nodesMap.set(chosenNode.id, updatedNode);

    this.setState(() => ({
      nodesMap: newNodesMap,
    }));
  };

  _toggleItemEditable = id => {
    const chosenNode = this.state.nodesMap.get(id);
    const updatedNode = new Item({
      id: chosenNode.id,
      isBeingEdited: !chosenNode.isBeingEdited,
      text: chosenNode.text,
    });
    const newNodesMap = this.state.nodesMap.set(chosenNode.id, updatedNode);

    this.setState(() => ({
      nodesMap: newNodesMap,
    }));
  };

  render() {
    const nodesSequence = this.state.nodesMap.valueSeq();

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8 ">
          <ul className="list-group">
            {nodesSequence.map((node, index) =>
              <li className="list-group-item" key={node.id}>
                <Node
                  id={node.id}
                  index={index + 1}
                  text={node.text}
                  isBeingEdited={node.isBeingEdited}
                  onSave={this._onUpdateText}
                  onDelete={this._deleteNode}
                  onEdit={this._toggleItemEditable}
                />
              </li>)}
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
