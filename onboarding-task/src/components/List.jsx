import React, { PureComponent } from 'react';
import { OrderedMap, Map } from 'immutable';
import { Adder } from './Adder';
import { Item } from './Item';
import { Node } from './Node';
import { generateId } from '../utils/generateId';

class List extends PureComponent {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      nodesMap: OrderedMap(),
    };
  }

  _addNode = text => {
    const generatedId = generateId();
    const newNode = {
      id: generatedId,
      isBeingEdited: false,
      text,
    };
    const newImtNode = new Item({ id: generatedId, text });
    const newNodesMap = this.state.nodesMap.set(newImtNode.id, newImtNode);

    this.setState(state => ({
      nodes: [...state.nodes, newNode],
      nodesMap: newNodesMap,
    }));

    console.log(this.state.nodesMap.toJS());
  };

  _deleteNode = id => {
    const newNodesMap = this.state.nodesMap.delete(id);
    this.setState(state => ({
      nodes: state.nodes.filter(node => node.id !== id),
      nodesMap: newNodesMap,
    }));
  };

  _onUpdateText = (id, text) => {
    this.setState(state => {
      const updateIndex = state.nodes.findIndex(node => node.id === id);
      const updatedList = [...state.nodes];
      updatedList[updateIndex] = {
        ...updatedList[updateIndex],
        text,
        isBeingEdited: false,
      };

      return { nodes: updatedList };
    });
  };

  _toggleItemEditable = id => {
    this.setState(state => {
      const updateIndex = state.nodes.findIndex(node => node.id === id);
      const updatedList = [...state.nodes];
      updatedList[updateIndex] = {
        ...updatedList[updateIndex],
        isBeingEdited: !state.nodes[updateIndex].isBeingEdited,
      };

      return { nodes: updatedList };
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8 ">
          <ul className="list-group">
            {this.state.nodes.map((node, index) =>
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
