import { observable } from 'mobx';
import i18n from '../i18n';
import addRole from './events/addRole';

function assassinWake(state) {
  const emblems = [];
  if (state.clock === 5) {
    state.chosenRoles.filter((r) => r === 'assassin').forEach(() => {
      emblems.push(addRole('assassin'));
    });
  }
  emblems.push(observable({
    icon: 'pistol-gun',
    description: i18n.emblems.assassinKill,
    valid: (e) => !!e.target,
    resolve(target, game, commit) {
      target.emblems.assassin = { icon: 'pistol-gun' };
      commit();
    },
  }));

  return {
    name: 'assassinWake',
    emblems,
  };
}

function assassinKill() {
  return {
    autoResolve: true,
    resolve(game, commit) {
      game.players.forEach((player) => {
        if (player.emblems.assassin) {
          delete player.emblems.assassin;
          player.state = 'dead';
          commit();
        }
      });
    },
  };
}

export default ({
  id: 'assassin',
  actions: {
    t5: () => assassinWake,
    t9: () => assassinKill,
  },
});
