import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class EditableNode extends PureComponent {
  static displayName = 'EditableNode';

  static propTypes = {
    text: PropTypes.string,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func,
    index: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };
  }

  _save = () => {
    this.props.onSave(this.state.text);
  };

  _cancel = () => {
    this.props.onCancel(this.props.text);
  };

  _delete = () => {
    this.props.onDelete();
  };

  _updateText = e => {
    e.persist();
    this.setState(() => ({
      text: e.target.value }));
  };

  render() {
    return (
      <div className="form-inline">
        {this.props.index}. <input className="form-control" value={this.state.text} onChange={this._updateText} />
        <button className="btn btn-primary" disabled={!this.state.text} onClick={this._save}>Save</button>
        <button className="btn btn-default" onClick={this._cancel}>Cancel</button>
        <button className="btn btn-danger" onClick={this._delete}>Delete</button>
      </div>
    );
  }
}

export { EditableNode };
