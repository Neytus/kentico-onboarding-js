import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextNode extends Component {
  constructor(props) {
    super(props);
    this.handleClickSave = this.handleClickSave.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.state = {
      textBackup: props.text,
      text: props.text,
    };
  }
  updateInputValue(evt) {
    this.setState({
      text: evt.target.value,
    });
  }
  handleClickSave() {
    console.log('Before save text: ' + this.state.text + ', textBackup: ' + this.state.textBackup);
    this.setState({
      textBackup: this.state.text,
    });
    console.log('After save text: ' + this.state.text + ', textBackup: ' + this.state.textBackup);
  }
  handleClickCancel() {
    console.log('Before cancel text: ' + this.state.text + ', textBackup: ' + this.state.textBackup);
    this.setState({
      text: this.state.textBackup,
    });
    console.log('After cancel text: ' + this.state.text + ', textBackup: ' + this.state.textBackup);
  }
  handleClickDelete() {
  }

  render() {
    return (
      <div>
        <input value={this.state.text} onChange={evt => this.updateInputValue(evt)} />
        <button onClick={this.handleClickSave}> Save</button>
        <button onClick={this.handleClickCancel}> Cancel</button>
        <button onClick={this.handleClickDelete}> Delete</button>
      </div>
    );
  }
}

TextNode.propTypes = {
  text: PropTypes.string,
};

export default TextNode;
