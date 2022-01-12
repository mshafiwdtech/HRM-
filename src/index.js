import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet'
import AppMeta from './company/appMeta.json'
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './store/main';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'



ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Helmet>
        <title>{AppMeta.appTitle}</title>
      </Helmet>
      <App />
    </Router>
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
