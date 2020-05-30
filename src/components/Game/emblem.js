import React from 'react'
import { Label } from 'semantic-ui-react'

export default function Emblem({ type, icon, description }) {
  switch (type) {
    case 'temp':
      return <Label title={description} size="tiny">
        <i className={`game-icon game-icon-${icon}`}></i>
      </Label>
    default:
      return null;
  }
}
