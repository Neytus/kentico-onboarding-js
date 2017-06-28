import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditableNode } from './EditableNode';
import { ListNode } from './ListNode';

class Node extends Component {
  static propTypes = {
    text: PropTypes.string,
    id: PropTypes.string,
    onSave: PropTypes.func,
    onDelete: PropTypes.func,
    index: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      edit: false,
    };
    this._edit = this._edit.bind(this);
    this._delete = this._delete.bind(this);
  }
  _edit(text) {
    if (this.state.edit === true) {
      this.props.onSave(this.props.id, text);
    }
    this.state.edit = !this.state.edit;
    this.state.text = text;
    this.forceUpdate();
  }
  _delete() {
    this.props.onDelete(this.props.id);
  }

  render() {
    if (this.state.edit === true) {
      return (
        <EditableNode text={this.state.text} index={this.props.index} onEdit={this._edit} onDelete={this._delete} />
      );
    }
    return (
      <ListNode text={this.state.text} index={this.props.index} onEdit={this._edit} />
    );
  }
}

export { Node };
