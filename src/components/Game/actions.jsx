import React from 'react';
import { observer } from 'mobx-react';
import { Segment, Button, Grid } from 'semantic-ui-react';

import ActionEmblem from './actionEmblem';

export default observer(({
  gameState, onResolve, onReset, onRedirectBack,
}) => {
  const valid = () => (gameState.action.emblems || []).every((e) => e.valid(e));
  const resolve = () => (valid() ? onResolve() : null);
  return (
    <Segment raised>
      <Grid relaxed>
        { (gameState.action && gameState.action.emblems) ? (
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
              <Button
                color={valid() ? 'green' : 'grey'}
                icon="arrow right"
                size="tiny"
                onClick={resolve}
              />
            </Grid.Column>
          </Grid.Row>
        ) : (
          [
            <Button fluid className="win-action-button" key="reset" onClick={onReset}>
              Reiniciar com as mesmas configurações
            </Button>,
            <Button fluid className="win-action-button" key="back" onClick={onRedirectBack}>
              Voltar ao menu principal
            </Button>,
          ]
        ) }
      </Grid>
    </Segment>
  );
});
