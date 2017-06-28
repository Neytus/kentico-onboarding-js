import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Adder extends PureComponent {
  static displayName = 'Adder';

  static propTypes = {
    onAdd: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  _clickAdd = () => {
    this.props.onAdd(this.state.text);
    this.setState(() => ({ text: '' }));
  };

  _updateText = e => {
    // TODO setState s lambdou
    this.setState({
      text: e.target.value,
    });
  };

  render() {
    return (
      <div className="form-inline">
        <input className="form-control" value={this.state.text} onChange={this._updateText} />
        <button className="btn btn-default" onClick={this._clickAdd} disabled={!this.state.text}>
          Add
        </button>
      </div>
    );
  }
}

export { Adder };
