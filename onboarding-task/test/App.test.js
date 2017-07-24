import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../src/App.jsx';

// Test ignored
// TODO pomenuj test lepsie
xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
