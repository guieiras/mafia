import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { DropTarget } from 'react-drag-drop-container';

export default function Players({ player }) {

  return <Grid.Row>
    <Grid.Column>
      <DropTarget targetKey="emblem" dropData={{player}}>
        <Image avatar src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
        { player.name }
      </DropTarget>
    </Grid.Column>
  </Grid.Row>
}
