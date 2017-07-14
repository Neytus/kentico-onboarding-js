import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class AddNode extends PureComponent {
  static displayName = 'AddNode';

  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    disabled: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  _onClickAdd = e => {
    e.preventDefault();
    this.props.onAdd(this.state.text);
    this.setState(() => ({ text: '' }));
  };

  _onUpdateText = e => {
    const text = e.target.value;
    this.setState(() => ({ text }));
  };

  render() {
    return (
      <form className="form-inline" >
        <input
          className="form-control"
          value={this.state.text}
          onChange={this._onUpdateText}
        />
        <button
          className="btn btn-default"
          onClick={this._onClickAdd}
          onSubmit={this._onClickAdd}
          disabled={this.props.disabled(this.state.text)}
        >Add
        </button>
      </form>
    );
  }
}

export { AddNode };
