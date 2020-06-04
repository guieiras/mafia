import React from 'react';
import { observer } from 'mobx-react';
import { DropTarget } from 'react-drag-drop-container';
import { Grid } from 'semantic-ui-react';
import Emblem from './emblem';
import i18n from '../../i18n';
import setTarget from '../../engine/modules/setTarget';

export default observer(({ player, emblems }) => {
  if (player.state === 'hidden') { return null; }
  return (
    <DropTarget
      as="div"
      className="row"
      targetKey="emblem"
      dropData={{ player }}
      onHit={(e) => setTarget(e.dragData.emblem, player)}
    >
      <Grid.Column width={11} className={`player player-${player.state}`}>
        { player.name }
        <small style={{ display: 'block' }}>{ i18n.roles[player.role] }</small>
      </Grid.Column>
      <Grid.Column width={5} textAlign="right">
        {
          Object
            .keys(player.emblems)
            .filter((e) => typeof player.emblems[e] === 'object')
            .map((e) => <Emblem key={e} type="active" icon={player.emblems[e].icon} />)
        }
        {
          emblems
            .filter((e) => (e.target && e.target.id) === player.id)
            .map((e, i) => <Emblem key={i} type="temp" icon={e.icon} />)
        }
      </Grid.Column>
    </DropTarget>
  );
});
