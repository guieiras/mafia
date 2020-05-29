import React from 'react'
import { Label } from 'semantic-ui-react'
import { DragDropContainer } from 'react-drag-drop-container'

export default function Emblem({ icon, description }) {
  return <DragDropContainer
    targetKey="emblem"
    dragData={{ icon, description }}
  >
    <Label>
      <i style={{marginRight: '5px'}} className={`game-icon game-icon-${icon}`}></i>
      {description}
    </Label>
  </DragDropContainer>
}
