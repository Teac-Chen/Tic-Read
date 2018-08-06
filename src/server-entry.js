import React from 'react';
import { App, HotApp } from './App.jsx'; // eslint-disable-line

const Root = process.env === 'development' ? HotApp : App;

export default <Root />;
