import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { EditableNode } from './EditableNode';
import { ListNode } from './ListNode';

class Node extends PureComponent {
  static displayName = 'Node';

  static propTypes = {
    text: PropTypes.string,
    id: PropTypes.string,
    onSave: PropTypes.func,
    onDelete: PropTypes.func,
    index: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      edit: false,
    };
  }

  _save = (text) => {
    this.props.onSave(this.props.id, text);
    this._swap();
    this.setState(() => ({
      text,
    }));
  };

  _swap = () => {
    this.setState(state => ({
      edit: !state.edit,
    }));
  };

  _delete = () => {
    this.props.onDelete(this.props.id);
  };

  render() {
    return (<div>
      {(this.state.edit === true) ? (
        <EditableNode
          text={this.state.text}
          index={this.props.index}
          onSave={this._save}
          onCancel={this._swap}
          onDelete={this._delete}
        />
      ) : (
        <ListNode text={this.state.text} index={this.props.index} onEdit={this._swap} />)
      }</div>);
  }
}

export { Node };
