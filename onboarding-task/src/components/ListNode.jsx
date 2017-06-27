import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListNode extends Component {
  constructor(props) {
    super(props);
    this.isEdited = this.isEdited.bind(this);
    this.state = {
      text: props.text,
    };
  }

  isEdited() {
    this.props.edit(this.state.text);
  }
  render() {
    return (
      <div onClick={this.isEdited}>{this.props.index}. {this.state.text}</div>
    );
  }
}

ListNode.propTypes = {
  text: PropTypes.string,
  edit: PropTypes.func,
  index: PropTypes.number,
};

export { ListNode };
