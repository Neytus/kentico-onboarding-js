import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditableNode } from './EditableNode';
import { ListNode } from './ListNode';

class TextNode extends Component {
  constructor(props) {
    super(props);
    this.setEdit = this.setEdit.bind(this);
    this.delete = this.delete.bind(this);
    this.state = {
      text: props.text,
      edit: false,
    };
  }
  setEdit(text) {
    if (this.state.edit === true) {
      this.props.saved(this.props.id, text);
    }
    this.state.edit = !this.state.edit;
    this.state.text = text;
    this.forceUpdate();
  }
  delete() {
    this.props.deleted(this.props.id);
  }

  render() {
    if (this.state.edit === true) {
      return (
        <EditableNode text={this.state.text} edit={this.setEdit} delete={this.delete} />
      );
    }
    return (
      <ListNode text={this.state.text} edit={this.setEdit} />
    );
  }
}

TextNode.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
  saved: PropTypes.func,
  deleted: PropTypes.func,
};

export { TextNode };
