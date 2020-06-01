import addRole from './addRole';
import getPlayerByRole from './getPlayerByRole';
import getActivePlayers from './getActivePlayers';

export default function basicWake(fn, role) {
  return (game) => {
    let emblemToAdd = null;
    if (!getPlayerByRole(game.players, role)) {
      emblemToAdd = addRole(role);
    }

    if (emblemToAdd || getPlayerByRole(getActivePlayers(game.players), role)) {
      return (...args) => {
        const resolved = fn(...args);
        if (emblemToAdd) { resolved.emblems.unshift(emblemToAdd); }
        return resolved;
      }
    }

    return () => ({
      name: 'playerDied',
      i18n: { role: [`roles.${role}`] },
      emblems: [],
    });
  };
}
