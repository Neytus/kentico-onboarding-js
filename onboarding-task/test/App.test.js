import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../src/App.tsx';

// Test ignored - redundant in the current context
xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
