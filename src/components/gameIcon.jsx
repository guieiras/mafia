import React from 'react';

export default function GameIcon(props) {
  const styles = props.style || {};
  const customClasses = props.className ? ` ${props.className}` : '';
  const classes = `game-icon game-icon-${props.icon} ${customClasses}`;

  return <i {...props} style={styles} className={classes} />;
}
