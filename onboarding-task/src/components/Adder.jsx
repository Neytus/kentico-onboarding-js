import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Adder extends Component {
  static propTypes = {
    onAdd: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this._clickAdd = this._clickAdd.bind(this);
  }

  _clickAdd() {
    this.props.onAdd(this.state.text);
    this.setState({
      text: '',
    });
  }

  _updateText(evt) {
    this.setState({
      text: evt.target.value,
    });
  }

  render() {
    return (
      <div className="form-inline">
        <input className="form-control" value={this.state.text} onChange={evt => this._updateText(evt)} />
        <button className="btn btn-default" onClick={this._clickAdd} disabled={!this.state.text}>
          Add
        </button>
      </div>
    );
  }
}

export { Adder };
