import React, { Component } from 'react';
import assignment from './../../../assignment.gif';
import { AddNode } from './AddNode.jsx';
import { Node } from './Node.jsx';
import { generateId } from '../utils/GenerateId';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }

  _addNode = text => {
    this.state.nodes.push({
      id: generateId(),
      text,
    });
    this.forceUpdate();
  };
  _deleteNode = id => {
    const deleteIndex = this.state.nodes.findIndex(node => {
      return node.id === id;
    });
    this.state.nodes.splice(deleteIndex, 1);
    this.forceUpdate();
  };
  _updateText = (id, text) => {
    this.forceUpdate();
    const updateIndex = this.state.nodes.findIndex(node => {
      return node.id === id;
    });
    this.state.nodes[updateIndex].text = text;
  };
  render() {
    return (
      <div className="row">
        {/* TODO: You can delete the assignment part once you do not need it */}
        <div className="row">
          <div className="col-sm-12">
            <img src={assignment} alt="assignment" className="img--assignment" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8 ">
            <ul className="list-group">
              {this.state.nodes.map((node, index) =>
                <li className="list-group-item" key={node.id}>
                  <Node
                    id={node.id}
                    index={index + 1}
                    text={node.text}
                    saved={this._updateText}
                    deleted={this._deleteNode}
                  />
                </li>)}
              <li className="list-group-item">
                <AddNode clicked={this._addNode} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
