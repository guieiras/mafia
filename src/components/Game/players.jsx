import React from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import Player from './player';

export default observer(({ gameState }) => (
  <Grid padded>
    {
      gameState.players.map((player) => (
        <Player player={player} key={player.id} emblems={gameState.action.emblems || []} />
      ))
    }
  </Grid>
));
