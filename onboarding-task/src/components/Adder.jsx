import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
    e.persist();
    this.setState(() => ({
      text: e.target.value }));
  };

  render() {
    return (
      <div className="form-inline">
        <input className="form-control" value={this.state.text} onChange={this._onUpdateText} />
        <button className="btn btn-default" onClick={this._onClickAdd} disabled={!this.state.text}>
          Add
        </button>
      </div>
    );
  }
}

export { Adder };
