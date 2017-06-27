import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditableNode extends Component {
  constructor(props) {
    super(props);
    this.isSaved = this.isSaved.bind(this);
    this.isCanceled = this.isCanceled.bind(this);
    this.isDeleted = this.isDeleted.bind(this);
    this.state = {
      text: props.text,
    };
  }

  isSaved() {
    this.props.edit(this.state.text);
  }
  isCanceled() {
    this.props.edit(this.props.text);
  }
  isDeleted() {
    this.props.delete();
  }
  updateInputValue(evt) {
    this.setState({
      text: evt.target.value,
    });
  }

  render() {
    return (
      <div className="form-inline">
        {this.props.index}. <input className="form-control" value={this.state.text} onChange={evt => this.updateInputValue(evt)} />
        <button className="btn btn-primary" disabled={!this.state.text} onClick={this.isSaved}>Save</button>
        <button className="btn btn-default" onClick={this.isCanceled}>Cancel</button>
        <button className="btn btn-danger" onClick={this.isDeleted}>Delete</button>
      </div>
    );
  }
}

EditableNode.propTypes = {
  text: PropTypes.string,
  edit: PropTypes.func,
  delete: PropTypes.func,
  index: PropTypes.number,
};

export { EditableNode };
