import React from 'react';

import db from '../boundaries/database';
import Engine from '../engine';

import Actions from '../components/Game/actions';
import CurrentAction from '../components/Game/currentAction';
import Players from '../components/Game/players';


export default function Game({ gameId }) {
  const engine = React.useRef();
  const [gameState, setGameState] = React.useState(
    { players: [], roles: [], action: {} },
  );
  function bindEngine(dbGame) { engine.current = new Engine(dbGame, setGameState); }

  React.useEffect(() => {
    db.games.get({ id: gameId }).then(bindEngine);
  }, [gameId]);

  function resolveActions() {
    engine.current.commit();
  }

  return (
    <div className="Game">
      <CurrentAction gameState={gameState} />
      <Players gameState={gameState} />
      <Actions gameState={gameState} onResolve={resolveActions} />
    </div>
  );
}
