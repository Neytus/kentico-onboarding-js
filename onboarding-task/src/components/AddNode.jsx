import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddNode extends Component {
  constructor(props) {
    super(props);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.state = {
      inputValue: '',
    };
  }

  handleClickAdd() {
    this.props.clicked(this.state.inputValue);
    this.setState({
      inputValue: '',
    });
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value,
    });
  }

  render() {
    return (
      <div className="form-inline">
        <input className="form-control" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} />
        <button className="btn btn-default" onClick={this.handleClickAdd} disabled={!this.state.inputValue}>
          Add
        </button>
      </div>
    );
  }
}

AddNode.propTypes = {
  clicked: PropTypes.func,
};

export { AddNode };
