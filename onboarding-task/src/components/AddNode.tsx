import * as React from 'react';
import * as PropTypes from 'prop-types';

import { isNullOrWhitespace } from '../utils/validation';
import { INodeViewModel } from '../models/NodeViewModel';

export interface IAddNodeDataProps {
  nodeViewModel: INodeViewModel;
}

export interface IAddNodeCallbacksProps {
  onAdd: (text: string) => void;
}

interface IAddNodeState {
  text: string;
}

class AddNode extends React.PureComponent<IAddNodeDataProps & IAddNodeCallbacksProps, IAddNodeState> {
  static displayName = 'AddNode';

  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

  constructor(props: IAddNodeDataProps & IAddNodeCallbacksProps) {
    super(props);
    this.state = {
      text: '',
    };
  }

  _onAdd = (event: React.SyntheticEvent<any>): void => {
    event.preventDefault();
    this.props.onAdd(this.state.text);
    this.setState(() => ({ text: '' }));
  };

  _updateText = (event: React.ChangeEvent<any>): void => {
    const text = event.target.value;
    this.setState(() => ({ text }));
  };

  render() {
    return (
      <form className="form-inline" onSubmit={this._onAdd}>

        <input
          autoFocus
          className="form-control"
          value={this.state.text}
          onChange={this._updateText}
        />

        <button
          autoFocus
          type="submit"
          className="btn btn-default"
          disabled={isNullOrWhitespace(this.state.text)}
        >
          Add
        </button>

      </form>
    );
  }
}

export { AddNode };
