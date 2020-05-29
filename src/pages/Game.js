import React from 'react';
import { Image, Grid, Segment } from 'semantic-ui-react';
import { DropTarget } from 'react-drag-drop-container';

import db from '../boundaries/database'
import Emblem from '../components/emblem'

export default function Game({ gameId }) {
  const [game, setGame] = React.useState({ players: [], roles: [] });

  React.useEffect(() => {
    db.games.get({ id: gameId }).then(setGame);
  }, [gameId]);

  return (
    <div className="Game">
      <Segment raised></Segment>
      <Grid padded>
        {
          game.players.map((player, i) => (
            <Grid.Row key={i}>
              <Grid.Column>
                <DropTarget targetKey="emblem" onHit={(target) => { console.log(target) }}>
                  <Image avatar src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
                  { player }
                </DropTarget>
              </Grid.Column>
            </Grid.Row>
          ))
        }
      </Grid>
      <Segment raised>
        <Emblem icon="targeted" description="Alvo" />
      </Segment>
    </div>
  );
}
