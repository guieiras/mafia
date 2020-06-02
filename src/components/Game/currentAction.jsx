import React from 'react';
import { observer } from 'mobx-react';
import { Segment, List } from 'semantic-ui-react';
import { DropTarget } from 'react-drag-drop-container';

import i18n from '../../i18n';
import setTarget from '../../engine/modules/setTarget';

export default observer(({ gameState }) => (
  <Segment raised>
    <DropTarget
      as="div"
      targetKey="emblem"
      dropData={{ player: null }}
      onHit={(e) => setTarget(e.dragData.emblem, null)}
    >
      { gameState.action.name && i18n.t(`actions.${gameState.action.name}`, gameState.action.i18n) }
      { gameState.action.events && gameState.action.events.length > 0 && <List bulleted className="event-list">
        { gameState.action.events.map(([event, target]) => <List.Item key={`event-${target.id}`}>
          { i18n.reports[event].split('%{target}').map((text) => {
            if (text === '') {
              return <b>{target.name}</b>;
            } else {
              return text;
            }
          }) }
        </List.Item>
        )}
      </List>}
    </DropTarget>
  </Segment>
));
