import React from 'react';
import { hot } from 'react-hot-loader'; // eslint-disable-line

export const App = () => (
  <h1>
    Hello React !!!!!!
  </h1>
);

export const HotApp = hot(module)(App);
