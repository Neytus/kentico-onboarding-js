import React, { Component } from 'react';
// import TextNode from './TextNode.jsx';

class AddTextComponent extends Component {
  constructor(props) {
    super(props);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.state = {
      inputValue: '',
    };
  }
  generateID() {
    let sGuid = '';
    for (let i = 0; i < 32; i++) {
      sGuid += Math.floor(Math.random() * 0xF).toString(0xF);
    }
    return sGuid;
  }
  handleClickAdd() {
    console.log(this.state.inputValue + ', generated ID: ' + this.generateID());
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
      <div>
        <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} />
        <button onClick={this.handleClickAdd}>
          Add
        </button>
      </div>
    );
  }
}

export default AddTextComponent;
