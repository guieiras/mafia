import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';

import 'semantic-ui-css/semantic.min.css';
import './assets/game-icons/game-icons.css';
import './index.css';

import Game from './pages/Game';
import Groups from './pages/Groups';
import Group from './pages/Group';
import Menu from './pages/Menu';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Menu path="/" />
      <Groups path="/groups" />
      <Group path="/groups/:groupId" />
      <Game path="/games/:gameId" />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
