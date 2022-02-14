import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import { DragDropContainer } from 'react-drag-drop-container';
import GameIcon from '../gameIcon';

export default function ActionEmblem({ icon, description, emblem }) {
  return (
    <DragDropContainer
      targetKey="emblem"
      dragData={{ emblem }}
    >
      <Label style={{ marginRight: '5px' }}>
        <GameIcon icon={icon} style={{ marginRight: '5px' }} />
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
}
