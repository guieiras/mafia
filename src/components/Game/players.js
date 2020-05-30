import React from 'react';
import { Grid } from 'semantic-ui-react';
import Player from './player';
import { observer } from 'mobx-react';

export default observer(function Players({ gameState }) {
  return <Grid padded>
    {
      gameState.players.map((player, i) => (
        <Player player={player} key={i} />
      ))
    }
  </Grid>
});
