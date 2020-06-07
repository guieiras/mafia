import { observable } from 'mobx';
import i18n from '../i18n';
import basicWake from './events/basicWake';

function kidnapperWake() {
  return {
    name: 'kidnapperWake',
    emblems: [
      observable({
        icon: 'silenced',
        description: i18n.emblems.kidnapper,
        valid: (e) => !!e.target,
        resolve(target) {
          target.emblems.kidnapper = { icon: 'silenced' };
        },
      }),
    ],
  };
}

export default ({
  id: 'kidnapper',
  icon: 'robber-mask',
  team: 'mafia',
  actions: {
    t7: basicWake(kidnapperWake, 'kidnapper'),
    t11: () => () => ({
      autoResolve: true,
      resolve(game, commit) {
        game.players.forEach((player) => {
          if (player.emblems.kidnapper && player.state === 'active') {
            game.events.push(['kidnapper', player]);
          }
        });

        commit();
      },
    }),
    playerLynch: (event) => {
      const originalEvent = event.emblems[0].resolve;
      const originalValidator = event.emblems[0].validateTarget;
      event.emblems[0].validateTarget = (target) => (
        originalValidator(target) && !target.emblems.kidnapper
      );
      event.emblems[0].resolve = (target, game, commit) => {
        game.players.forEach((player) => {
          delete player.emblems.kidnapper;
        });
        originalEvent(target, game, commit);
      };

      return event;
    },
  },
});
