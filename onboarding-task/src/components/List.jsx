import React, { PureComponent } from 'react';
import { OrderedMap } from 'immutable';
import { Adder } from './Adder';
import { NodeContent } from '../models/NodeContent';
import { NodeInfo } from '../models/NodeInfo';
import { NodeViewModel } from '../models/NodeViewModel';
import { Node } from './Node';
import { generateId } from '../utils/generateId';

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
    const newNodeInfos = this.state.nodeInfos.update(
      id,
      node => new NodeInfo({ isBeingEdited: !node.isBeingEdited })
    );

    this.setState(() => ({
      nodeInfos: newNodeInfos,
    }));
  };

  _onSave = (id, text) => {
    this._onToggle(id);

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
      .keySeq()
      .map((key, index) => {
        const nodeContent = this.state.nodes.get(key);
        const nodeInfo = this.state.nodeInfos.get(key);
        const nodeViewModel = new NodeViewModel({
          id: key,
          isBeingEdited: nodeInfo.isBeingEdited,
          text: nodeContent.text,
          index: index + 1,
        });
        return (<li className="list-group-item" key={nodeViewModel.id}>
          <Node
            id={nodeViewModel.id}
            index={nodeViewModel.index}
            text={nodeViewModel.text}
            isBeingEdited={nodeViewModel.isBeingEdited}
            onSave={this._onSave}
            onToggle={this._onToggle}
            onDelete={this._deleteNode}
          />
        </li>);
      });
    //
    // const nodes = this.state.nodes
    //   .valueSeq()
    //   .map((node, index) => {
    //     return (<li className="list-group-item" key={node.id}>
    //       <Node
    //         id={node.id}
    //         index={index + 1}
    //         text={node.text}
    //         isBeingEdited={node.isBeingEdited}
    //         onSave={this._onSave}
    //         onToggle={this._onToggle}
    //         onDelete={this._deleteNode}
    //       />
    //     </li>); }
    // );

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
