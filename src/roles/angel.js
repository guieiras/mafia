import { observable } from 'mobx';
import i18n from '../i18n';
import basicWake from './events/basicWake';

function angelWake() {
  return {
    name: 'angelWake',
    emblems: [
      observable({
        icon: 'angel-outfit',
        description: i18n.emblems.angel,
        valid: (e) => !!e.target,
        resolve(target) {
          target.emblems.angel = { icon: 'angel-outfit' };
        },
      }),
    ],
  };
}

function angelProtect() {
  return {
    autoResolve: true,
    resolve(game, commit) {
      game.players.forEach((player) => {
        if (player.emblems.angel) {
          delete player.emblems.angel;
          delete player.emblems.assassin;
          commit();
        }
      });
    },
  };
}

export default ({
  id: 'angel',
  actions: {
    t7: basicWake(angelWake, 'angel'),
    t8: () => angelProtect,
  },
});
