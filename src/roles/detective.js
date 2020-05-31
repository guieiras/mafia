import { observable } from 'mobx';
import i18n from '../i18n';

function detectiveWake() {
  return {
    name: 'detectiveWake',
    emblems: [
      observable({
        icon: 'sherlock-holmes',
        description: i18n.emblems.detectiveInvestigated,
        valid: (e) => !!e.target,
        resolve(target, game, commit) {
          game.stack.unshift(() => ({
            name: ['assassin'].indexOf(target.role) > -1
              ? 'investigationSuccess'
              : 'investigationFailed',
            emblems: [],
          }));
        },
      }),
    ],
  };
}

export default ({
  id: 'detective',
  actions: {
    t7: () => detectiveWake,
  },
});
