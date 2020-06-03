import { observable } from 'mobx';
import i18n from '../i18n';
import basicWake from './events/basicWake';

function emergencyWake() {
  return {
    name: 'emergencyWake',
    emblems: [
      observable({
        icon: 'medical-pack',
        description: i18n.emblems.emergency,
        validateTarget: (player) => player.role !== 'emergency' && player.state === 'active',
        valid: (e) => !!e.target,
        resolve(target) {
          target.emblems.emergency = { icon: 'medical-pack' };
        },
      }),
    ],
  };
}

export default ({
  id: 'emergency',
  actions: {
    t7: basicWake(emergencyWake, 'emergency'),
    t13: () => () =>({
      autoResolve: true,
      resolve(game, commit) {
        game.players.forEach((player) => {
          if (player.emblems.emergency && player.state === 'active') {
            player.state = 'dead';
          }
          delete player.emblems.emergency;
        });
        commit();
      },
    }),
    assassinKill: (event) => {
      const originalEvent = event.resolve;
      event.resolve = (game, commit) => {
        game.players.forEach((player) => {
          if (player.emblems.emergency) {
            if (player.emblems.assassin) {
              game.events.push(['emergency', player]);
              delete player.emblems.assassin;
            } else {
              delete player.emblems.emergency;
            }
          }
        });
        originalEvent(game, commit);
      };

      return event;
    },
  },
});
