import React from 'react';
import { observer } from 'mobx-react';
import { Segment } from 'semantic-ui-react';

import Emblem from '../emblem';

export default observer(function Actions({ gameState }) {
  return <Segment raised>
    {
      (gameState.action.emblems || []).map((emblem, i) => (
        <Emblem key={i} description={emblem.description} icon={emblem.icon} emblem={emblem} />
      ))
    }
  </Segment>
})
