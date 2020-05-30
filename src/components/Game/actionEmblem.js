import React from 'react'
import { Label, Icon } from 'semantic-ui-react'
import { DragDropContainer } from 'react-drag-drop-container'
import { observer } from 'mobx-react'

export default observer(function ActionEmblem({ icon, description, emblem }) {
  return <DragDropContainer
    targetKey="emblem"
    dragData={{ emblem }}
    onDrop={(e) => emblem.target = e.dropData.player}
  >
    <Label>
      <i
        style={{ marginRight: '5px'}}
        className={`game-icon game-icon-${icon}`}
      ></i>
      { description }
      {
        emblem.valid(emblem)
          ? <Label floating circular color="green" size="tiny" className="emblem-valid">
            <Icon name="check" />
          </Label>
          : null
      }
    </Label>
  </DragDropContainer>
})
