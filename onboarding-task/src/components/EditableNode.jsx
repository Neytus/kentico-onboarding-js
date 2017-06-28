import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditableNode extends Component {
  static propTypes = {
    text: PropTypes.string,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    index: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };
    this._save = this._save.bind(this);
    this._cancel = this._cancel.bind(this);
    this._delete = this._delete.bind(this);
    this._updateText = this._updateText.bind(this);
  }

  _save() {
    this.props.onEdit(this.state.text);
  }
  _cancel() {
    this.props.onEdit(this.props.text);
  }
  _delete() {
    this.props.onDelete();
  }
  _updateText(evt) {
    this.setState({
      text: evt.target.value,
    });
  }

  render() {
    return (
      <div className="form-inline">
        {this.props.index}. <input className="form-control" value={this.state.text} onChange={evt => this._updateText(evt)} />
        <button className="btn btn-primary" disabled={!this.state.text} onClick={this._save}>Save</button>
        <button className="btn btn-default" onClick={this._cancel}>Cancel</button>
        <button className="btn btn-danger" onClick={this._delete}>Delete</button>
      </div>
    );
  }
}

export { EditableNode };
