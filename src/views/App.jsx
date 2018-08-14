import React from 'react';
import { hot } from 'react-hot-loader'; // eslint-disable-line
import {
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

const Home = () => (
  <h2>
    Home
  </h2>
);
const Detail = () => (
  <h2>
    Detail
  </h2>
);
const About = () => (
  <h2>
    About
  </h2>
);

export const App = () => (
  <section>
    <nav>
      <ul>
        <li>
          <Link to="/home">
            Home
          </Link>
        </li>
        <li>
          <Link to="/detail">
            Detail
          </Link>
        </li>
        <li>
          <Link to="/about">
            About
          </Link>
        </li>
      </ul>
    </nav>
    <Route exact path="/" render={() => <Redirect to="/home" />} />
    <Route path="/home" component={Home} />
    <Route path="/detail" component={Detail} />
    <Route path="/about" component={About} />
  </section>
);

export const HotApp = hot(module)(App);
