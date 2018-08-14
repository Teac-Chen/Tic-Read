import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';

import { App, HotApp } from 'views/App';

const Root = process.env === 'development' ? HotApp : App;

// ReactDom.hydrate((
ReactDom.render((
  <BrowserRouter>
    <Root />
  </BrowserRouter>
), document.getElementById('root'));
