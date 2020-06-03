import { observable } from 'mobx';
import i18n from '../i18n';
import basicWake from './events/basicWake';

function bulletproofWake() {
  return {
    name: 'bulletproofWake',
    emblems: [
      observable({
        icon: 'kevlar',
        description: i18n.emblems.bulletproof,
        validateTarget: (player) => player.role !== 'bulletproof' && player.state === 'active',
        valid: (e) => !!e.target,
        resolve(target) {
          target.emblems.bulletproof = { icon: 'kevlar' };
        },
      }),
    ],
  };
}

export default ({
  id: 'bulletproof',
  actions: {
    t7: basicWake(bulletproofWake, 'bulletproof'),
    assassinKill: (event) => {
      const originalEvent = event.resolve;
      event.resolve = (game, commit) => {
        game.players.forEach((player) => {
          if (player.emblems.bulletproof) {
            delete player.emblems.bulletproof;
            delete player.emblems.assassin;
          }
        });
        originalEvent(game, commit);
      };

      return event;
    },
  },
});
