import React from 'react';
import { observer } from 'mobx-react';
import { Segment, Button, Grid } from 'semantic-ui-react';

import ActionEmblem from './actionEmblem';

export default observer(({ gameState, onResolve }) => {
  const valid = () => (gameState.action.emblems || []).every((e) => e.valid(e));
  const resolve = () => (valid() ? onResolve() : null);
  return (
    <Segment raised>
      <Grid relaxed>
        <Grid.Row className="game-actions-wrapper">
          <Grid.Column width={12}>
            {
              (gameState.action.emblems || []).map((emblem, i) => (
                <ActionEmblem
                  key={i}
                  description={emblem.description}
                  icon={emblem.icon}
                  emblem={emblem}
                />
              ))
            }
          </Grid.Column>
          <Grid.Column width={4} textAlign="right">
            {gameState.action && gameState.action.emblems
              && (
                <Button
                  color={valid() ? 'green' : 'grey'}
                  icon="arrow right"
                  size="tiny"
                  onClick={resolve}
                />
              )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
});
