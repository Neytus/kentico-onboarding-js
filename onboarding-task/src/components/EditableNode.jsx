import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class EditableNode extends PureComponent {
  static displayName = 'EditableNode';

  static propTypes = {
    disabled: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    nodeModel: PropTypes.shape({
      text: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.nodeModel.text,
    };
  }

  _saveNode = event => {
    event.preventDefault();
    this.props.onSave(this.props.nodeModel.id, this.state.text);
  };

  _cancelNode = () => this.props.onCancel(this.props.nodeModel.id);

  _deleteNode = () => this.props.onDelete(this.props.nodeModel.id);

  _updateText = event => {
    const text = event.target.value;
    this.setState(() => ({ text }));
  };

  render() {
    return (
      <form className="form-inline" onSubmit={this._saveNode}>
        {this.props.nodeModel.index}.

        <input
          autoFocus
          className="form-control"
          value={this.state.text}
          onChange={this._updateText}
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={this.props.disabled(this.state.text)}
          onClick={this._saveNode}
        >
          Save
        </button>

        <button
          type="button"
          className="btn btn-default"
          onClick={this._cancelNode}
        >
          Cancel
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={this._deleteNode}
        >
          Delete
        </button>

      </form>
    );
  }
}

export { EditableNode };
