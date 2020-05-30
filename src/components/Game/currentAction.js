import React from 'react';
import { observer } from 'mobx-react';
import { Segment } from 'semantic-ui-react';

import i18n from '../../i18n';

export default observer(function CurrentAction({ gameState }) {
  return <Segment raised>
    { i18n.actions[gameState.action.name] }
  </Segment>
})
