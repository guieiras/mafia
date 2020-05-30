import React from 'react';
import { observer } from 'mobx-react';
import { Segment } from 'semantic-ui-react';
import { DropTarget } from 'react-drag-drop-container'


import i18n from '../../i18n';

export default observer(function CurrentAction({ gameState }) {
  return <Segment raised>
    <DropTarget as="div" targetKey="emblem" dropData={{ player: null }}>
      { i18n.actions[gameState.action.name] }
    </DropTarget>
  </Segment>
})
