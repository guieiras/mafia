import React from 'react';
import { observer } from 'mobx-react';
import { Segment, Button } from 'semantic-ui-react';

import ActionEmblem from './actionEmblem';

export default observer(({ gameState, onResolve }) => {
  const valid = () => (gameState.action.emblems || []).every((e) => e.valid(e));
  const resolve = () => (valid() ? onResolve() : null);
  return (
    <Segment raised>
      {gameState.action && gameState.action.emblems
    && (
    <Button
      floated="right"
      color={valid() ? 'green' : 'grey'}
      icon="arrow right"
      size="tiny"
      onClick={resolve}
    />
    ) }
      {
      (gameState.action.emblems || []).map((emblem, i) => (
        <ActionEmblem key={i} description={emblem.description} icon={emblem.icon} emblem={emblem} />
      ))
    }
    </Segment>
  );
});
