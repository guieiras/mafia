import React from 'react';
import { Grid } from 'semantic-ui-react';
import Player from './player';
import { observer } from 'mobx-react';

export default observer(function Players({ gameState }) {
  return <Grid padded>
    {
      gameState.players.map((player) => (
        <Player player={player} key={player.id} emblems={gameState.action.emblems || []} />
      ))
    }
  </Grid>
});
