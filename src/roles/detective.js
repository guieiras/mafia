import { observable } from 'mobx';
import i18n from '../i18n';
import basicWake from './events/basicWake';

function detectiveWake() {
  return {
    name: 'detectiveWake',
    emblems: [
      observable({
        icon: 'sherlock-holmes',
        description: i18n.emblems.detective,
        valid: (e) => !!e.target,
        resolve(target, game) {
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
    t7: basicWake(detectiveWake, 'detective'),
  },
});
