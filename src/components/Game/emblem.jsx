import React from 'react';
import { Label } from 'semantic-ui-react';

export default function Emblem({ type, icon, description }) {
  switch (type) {
    case 'temp':
      return (
        <Label title={description} size="tiny" style={{ marginLeft: '5px' }}>
          <i className={`game-icon game-icon-${icon}`} />
        </Label>
      );
    case 'active':
      return <i style={{ marginLeft: '5px' }} className={`game-icon game-icon-${icon}`} />;
    default:
      return null;
  }
}
