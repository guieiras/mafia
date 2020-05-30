import React from 'react'
import { Label } from 'semantic-ui-react'
import { DragDropContainer } from 'react-drag-drop-container'

export default function Emblem({ icon, description, emblem }) {
  const [target, setTarget] = React.useState({});

  return <DragDropContainer
    targetKey="emblem"
    dragData={{ emblem }}
    onDrop={(e) => setTarget(e.dropData.player)}
  >
    <Label>
      <i style={{marginRight: '5px'}} className={`game-icon game-icon-${icon}`}></i>
      {description}
      <p><small>{ target.name }</small></p>
    </Label>
  </DragDropContainer>
}
