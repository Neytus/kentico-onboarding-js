import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListNode extends Component {
  static propTypes = {
    text: PropTypes.string,
    onEdit: PropTypes.func,
    index: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };
    this._edit = this._edit.bind(this);
  }

  _edit() {
    this.props.onEdit(this.state.text);
  }
  render() {
    return (
      <div onClick={this._edit}>{this.props.index}. {this.state.text}</div>
    );
  }
}

export { ListNode };
