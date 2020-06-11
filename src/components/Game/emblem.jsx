import React from 'react';
import { Label } from 'semantic-ui-react';
import GameIcon from '../gameIcon';

export default function Emblem({ type, icon, description }) {
  switch (type) {
    case 'temp':
      return (
        <Label title={description} size="tiny" style={{ marginLeft: '5px' }}>
          <GameIcon icon={icon} />
        </Label>
      );
    case 'active':
      return <GameIcon icon={icon} style={{ marginLeft: '5px' }} />;
    default:
      return null;
  }
}
