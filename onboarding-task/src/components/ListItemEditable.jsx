import React, { Component, PropTypes } from 'react';

class ListItemEditable extends Component {
  static displayName = 'ListItemEditable';
  static propTypes = {
    item: React.PropTypes.shape({
      guid: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
    }),
    index: PropTypes.number.isRequired,
    onUpdateText: PropTypes.func.isRequired,
    onToggleEditMode: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { text: props.item.text };

    this._onCancel = this._onCancel.bind(this);
    this._onUpdate = this._onUpdate.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  _onCancel() {
    this.props.onToggleEditMode(this.props.item.guid);
  }

  _onUpdate() {
    this.props.onUpdateText(this.props.item.guid, this.state.text);
  }

  _onDelete() {
    this.props.onDelete(this.props.item.guid);
  }

  _onInputChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <tr>
        <td>
          <div className="form-inline">
            <div className="form-group">
              {this.props.index}. <input className="form-control" type="text" value={this.state.text} onChange={this._onInputChange} />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" onClick={this._onUpdate}>Save</button>
              <button className="btn btn-default" onClick={this._onCancel}>Cancel</button>
              <button className="btn btn-danger" onClick={this._onDelete}>Delete</button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export { ListItemEditable };
