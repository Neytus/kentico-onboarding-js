import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { isNullOrWhitespace } from '../utils/validation';

class EditableNode extends PureComponent {
  static displayName = 'EditableNode';

  static propTypes = {
    nodeModel: PropTypes.shape({
      text: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.nodeModel.text,
    };
  }

  _save = event => {
    event.preventDefault();
    if (!this.refs.saveButton.disabled) {
      this.props.onSave(this.state.text);
    }
  };

  _onUpdateText = event => {
    const text = event.target.value;
    this.setState(() => ({ text }));
  };

  render() {
    return (
      <form className="form-inline" onSubmit={this._save}>
        {this.props.nodeModel.index}.

        <input
          autoFocus
          className="form-control"
          value={this.state.text}
          onChange={this._onUpdateText}
        />

        <button
          type="button"
          ref="saveButton"
          className="btn btn-primary"
          disabled={isNullOrWhitespace(this.state.text)}
          onClick={this._save}
        >
          Save
        </button>

        <button
          type="button"
          className="btn btn-default"
          onClick={this.props.onCancel}
        >
          Cancel
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={this.props.onDelete}
        >
          Delete
        </button>

      </form>
    );
  }
}

export { EditableNode };
