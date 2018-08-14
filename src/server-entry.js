import React from 'react';
import { StaticRouter } from 'react-router-dom';

import { App, HotApp } from 'views/App';

const Root = process.env === 'development' ? HotApp : App;

export default (routerContext, url) => (
  <StaticRouter context={routerContext} location={url}>
    <Root />
  </StaticRouter>
);
