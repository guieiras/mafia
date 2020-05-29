import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from "@reach/router"

import 'semantic-ui-css/semantic.min.css'
import './assets/game-icons/game-icons.css'

import Game from './pages/Game';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Game path=":gameId" />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
