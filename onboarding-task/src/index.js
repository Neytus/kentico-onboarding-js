import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { App } from './App.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { rootReducer } from './reducers/rootReducer';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
