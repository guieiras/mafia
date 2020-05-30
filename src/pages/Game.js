import React from 'react';

import db from '../boundaries/database'
import Engine from '../engine'

import Actions from '../components/Game/actions'
import CurrentAction from '../components/Game/currentAction'
import Players from '../components/Game/players'


export default function Game({ gameId }) {
  let engine;
  const [gameState, setGameState] = React.useState(
    { players: [], roles: [], action: {} }
  );

  React.useEffect(() => {
    db.games.get({ id: gameId }).then(bindEngine);
  }, [gameId]);

  function bindEngine(dbGame) { engine = new Engine(dbGame, setGameState); }

  return (
    <div className="Game">
      <CurrentAction gameState={gameState} />
      <Players gameState={gameState} />
      <Actions gameState={gameState} />
    </div>
  );
}
