import React from 'react';
import { List } from 'semantic-ui-react';

export default function Check({ checked, onCheck, onUncheck }) {
  return (
    <List.Icon
      size="large"
      name={checked ? 'circle check' : 'circle outline'}
      onClick={checked ? onUncheck : onCheck}
    />
  );
}
