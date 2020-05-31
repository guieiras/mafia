import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import { DragDropContainer } from 'react-drag-drop-container';

export default ({ icon, description, emblem }) => (
  <DragDropContainer
    targetKey="emblem"
    dragData={{ emblem }}
  >
    <Label style={{ marginRight: '5px' }}>
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
);
