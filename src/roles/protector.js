import { observable } from 'mobx';
import i18n from '../i18n';
import basicWake from './events/basicWake';

function protectorWake() {
  return {
    name: 'protectorWake',
    emblems: [
      observable({
        icon: 'book-cover',
        description: i18n.emblems.protector,
        valid: (e) => !!e.target,
        resolve(target) {
          target.emblems.protector = { icon: 'book-cover' };
        },
      }),
    ],
  };
}

export default ({
  id: 'protector',
  icon: 'book-cover',
  team: 'city',
  actions: {
    t7: basicWake(protectorWake, 'protector'),
    t11: () => () => ({
      autoResolve: true,
      resolve(game, commit) {
        game.players.forEach((player) => {
          if (player.emblems.protector && player.state === 'active') {
            game.events.push(['protector', player]);
          }
        });

        commit();
      },
    }),
    playerLynch: (event) => {
      const originalEvent = event.emblems[0].resolve;
      const originalValidator = event.emblems[0].validateTarget;
      event.emblems[0].validateTarget = (target) => (
        originalValidator(target) && !target.emblems.protector
      );
      event.emblems[0].resolve = (target, game, commit) => {
        game.players.forEach((player) => {
          delete player.emblems.protector;
        });
        originalEvent(target, game, commit);
      };

      return event;
    },
  },
});
