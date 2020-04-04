import React from 'react';
import  {render} from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import indexReducer from './indexReducer';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(
  indexReducer,
  compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
  )

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
