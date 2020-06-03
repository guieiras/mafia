import { observable } from 'mobx';
import basicWake from './events/basicWake';
import i18n from '../i18n';

function lawyerWake() {
  return {
    name: 'lawyerWake',
    emblems: [
      observable({
        icon: 'suitcase',
        description: i18n.emblems.lawyer,
        valid: (e) => !!e.target,
        validateTarget: (player) => player.role !== 'lawyer' && player.state === 'active',
        resolve(target) {
          target.emblems.lawyer = { icon: 'suitcase' };
        },
      }),
    ],
  };
}

function removeEmblem(game) {
  game.players.forEach((player) => { delete player.emblems.lawyer; });
}

export default ({
  id: 'lawyer',
  actions: {
    t7: basicWake(lawyerWake, 'lawyer'),
    investigationSuccess: (event, game) => {
      if (event.target.emblems.lawyer) { event.name = 'investigationFailed'; }
      removeEmblem(game);
      return event;
    },
    playerDied: (event, game) => {
      if (event.i18n.role[0] === 'roles.detective') {
        removeEmblem(game);
      }
      return event;
    },
  },
});
