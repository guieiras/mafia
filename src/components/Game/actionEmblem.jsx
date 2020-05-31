import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import { DragDropContainer } from 'react-drag-drop-container';
import { observer } from 'mobx-react';

export default observer(({ icon, description, emblem }) => (
  <DragDropContainer
    targetKey="emblem"
    dragData={{ emblem }}
    onDrop={(e) => {
      const validateTarget = emblem.validateTarget || ((target) => target.state === 'active');
      if (validateTarget(e.dropData.player)) {
        emblem.target = e.dropData.player;
      }
    }}
  >
    <Label>
      <i
        style={{ marginRight: '5px' }}
        className={`game-icon game-icon-${icon}`}
      />
      { description }
      {
        emblem.valid(emblem)
          ? (
            <Label floating circular color="green" size="tiny" className="emblem-valid">
              <Icon name="check" />
            </Label>
          )
          : null
      }
    </Label>
  </DragDropContainer>
));
