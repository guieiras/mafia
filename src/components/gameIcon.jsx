import React from 'react';

export default function GameIcon({ icon, className, ...props }) {
  const customClasses = className ? ` ${className}` : '';
  const classes = `game-icon game-icon-${icon} ${customClasses}`;

  return <i {...props} className={classes} />;
}
