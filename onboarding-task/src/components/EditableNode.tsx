import * as React from 'react';
import * as PropTypes from 'prop-types';
const ImmutablePropTypes = require('react-immutable-proptypes');

import { isNullOrWhitespace } from '../utils/validation';
import { INodeViewModel } from '../models/NodeViewModel';

export interface IEditableNodeDataProps {
  nodeViewModel: INodeViewModel;
}

export interface IEditableNodeCallbacksProps {
  onSave: (text: string) => void;
  onCancel: () => void;
  onDelete: () => void;
}

interface IEditableNodeState {
  text: string;
}

export class EditableNode extends React.PureComponent<IEditableNodeDataProps & IEditableNodeCallbacksProps, IEditableNodeState> {
  static displayName = 'EditableNode';

  static propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    nodeViewModel: ImmutablePropTypes.recordOf({
      text: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
    }).isRequired,
  };

  constructor(props: IEditableNodeDataProps & IEditableNodeCallbacksProps) {
    super(props);

    this.state = {
      text: props.nodeViewModel.text,
    };
  }

  _cancelNode = (event: React.KeyboardEvent<HTMLFormElement>): void => {
    if (event.keyCode === 27) {
      this.props.onCancel();
    }
  };

  _saveNode = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.props.onSave(this.state.text);
  };

  _updateText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const text = event.target.value;
    this.setState(() => ({text}));
  };

  render() {
    const {text} = this.state;

    return (
      <form className="form-inline" onSubmit={this._saveNode} onKeyDown={this._cancelNode}>
        {this.props.nodeViewModel.index}.

        <input
          autoFocus
          className="form-control"
          value={text}
          onChange={this._updateText}
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isNullOrWhitespace(text)}
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
