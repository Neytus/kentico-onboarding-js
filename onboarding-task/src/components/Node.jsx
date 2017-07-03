import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { EditableNode } from './EditableNode';
import { ListNode } from './ListNode';

class Node extends PureComponent {
  static displayName = 'Node';

  static propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
  };

  _onSave = text => {
    this.props.onSave(this.props.id, text);
  };

  _onCancel = () => {
    this.props.onEdit(this.props.id);
  };

  _toggleNodeEditable = () => {
    this.props.onEdit(this.props.id);
  };

  _onDelete = () => this.props.onDelete(this.props.id);

  render() {
    return this.props.isBeingEdited === true ? (
      <EditableNode
        text={this.props.text}
        index={this.props.index}
        onSave={this._onSave}
        onCancel={this._toggleNodeEditable}
        onDelete={this._onDelete}
      />
    ) : (
      <ListNode
        text={this.props.text}
        index={this.props.index}
        onEdit={this._toggleNodeEditable}
      />
    );
  }
}

export { Node };
