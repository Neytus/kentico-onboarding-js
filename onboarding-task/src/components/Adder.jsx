import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { notEmptyNotWhitespace } from '../utils/validation.js';

class Adder extends PureComponent {
  static displayName = 'Adder';

  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  _onClickAdd = () => {
    this.props.onAdd(this.state.text);
    this.setState(() => ({ text: '' }));
  };

  _onUpdateText = e => {
    const text = e.target.value;
    this.setState(() => ({ text }));
  };

  _onKeyPress = e => {
    if ((e.key === 'Enter') && !notEmptyNotWhitespace(this.state.text)) {
      this._onClickAdd();
    }
  };

  render() {
    return (
      <div className="form-inline" onKeyDown={this._onKeyPress}>
        <input className="form-control" value={this.state.text} onChange={this._onUpdateText} />
        <button className="btn btn-default" onClick={this._onClickAdd} onSubmit={this._onClickAdd} disabled={notEmptyNotWhitespace(this.state.text)}>
          Add
        </button>
      </div>
    );
  }
}

export { Adder };
