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
    index: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isEdited: false,
    };
  }

  _save = (text) => {
    this.props.onSave(this.props.id, text);
    this._swap();
    this.props.text = text;
  };

  _swap = () => {
    this.setState(state => ({
      isEdited: !state.isEdited,
    }));
  };

  _delete = () => {
    this.props.onDelete(this.props.id);
  };

  render() {
    return (<div>
      {(this.state.isEdited === true) ? (
        <EditableNode
          text={this.props.text}
          index={this.props.index}
          onSave={this._save}
          onCancel={this._swap}
          onDelete={this._delete}
        />
      ) : (
        <ListNode text={this.props.text} index={this.props.index} onEdit={this._swap} />)
      }</div>);
  }
}

export { Node };
