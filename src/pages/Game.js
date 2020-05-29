import React from 'react';
import db from '../boundaries/database'
import { Image, List, Segment } from 'semantic-ui-react';

export default function Game({ gameId }) {
  const [game, setGame] = React.useState({ players: [], roles: [] });

  React.useEffect(() => {
    db.games.get({ id: gameId }).then(setGame);
  }, [gameId]);

  return (
    <div className="Game">
      <Segment raised></Segment>
      <List relaxed divided verticalAlign='middle'>
        {
          game.players.map((player) => <List.Item>
            <List.Content floated='right'>
            </List.Content>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
            <List.Content>{player}</List.Content>
          </List.Item>)
        }
      </List>
    </div>
  );
}
