import { observable } from 'mobx';
import appendRoleDiscover from './events/appendRoleDiscover';
import i18n from '../i18n';

function hunterKill() {
  return {
    name: 'hunterKill',
    emblems: [
      observable({
        icon: 'sawed-off-shotgun',
        description: i18n.emblems.hunter,
        valid: (e) => !!e.target,
        resolve(target, game, commit) {
          target.state = 'dead';
          commit();
        },
      }),
    ],
  };
}

export default ({
  id: 'hunter',
  actions: {
    identifyRoles: appendRoleDiscover('hunter'),
    playerLynch: (event) => {
      const originalEvent = event.emblems[0].resolve;
      event.emblems[0].resolve = (target, game, commit) => {
        originalEvent(target, game, commit);
        if (target && target.role === 'hunter') {
          game.stack.unshift(hunterKill);
        }
        commit();
      };

      return event;
    },
  },
});
