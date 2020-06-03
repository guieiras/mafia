import { observable } from 'mobx';
import i18n from '../i18n';
import getPlayerByRole from './events/getPlayerByRole';
import basicWake from './events/basicWake';

function bodyguardWake() {
  return {
    name: 'bodyguardWake',
    emblems: [
      observable({
        icon: 'static-guard',
        description: i18n.emblems.bodyguard,
        validateTarget: (player) => player.role !== 'bodyguard' && player.state === 'active',
        valid: (e) => !!e.target,
        resolve(target, game, commit) {
          const emblem = target.emblems.assassin;
          if (emblem) {
            const guard = getPlayerByRole(game.players, 'bodyguard');
            delete target.emblems.assassin;
            guard.emblems.assassin = emblem;
            commit();
          }
        },
      }),
    ],
  };
}

export default ({
  id: 'bodyguard',
  actions: {
    t7: basicWake(bodyguardWake, 'bodyguard'),
  },
});
