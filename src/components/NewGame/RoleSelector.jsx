import React from 'react';
import { Label } from 'semantic-ui-react';
import GameIcon from '../gameIcon';

export default function RoleSelector({
  text, icon, lockCheck, lockUncheck, checked, onCheck, onUncheck,
}) {
  function handleClick() {
    if (!checked && !lockCheck) { return onCheck(); }
    if (checked && !lockUncheck) { return onUncheck(); }

    return null;
  }

  return (
    <Label
      as="a"
      title={text}
      color={checked ? 'green' : null}
      onClick={handleClick}
    >
      <GameIcon style={{ marginRight: '5px' }} icon={icon} />
      {text}
    </Label>
  );
}
