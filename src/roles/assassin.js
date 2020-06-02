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
    description: i18n.emblems.assassin,
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

function assassin() {
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
    t11: () => assassin,
  },
  win(game) {
    const livePlayers = game.players.filter((player) => player.state === 'active');
    const assassinsCount = livePlayers.filter((player) => player.role === 'assassin').length;
    const playersCount = livePlayers.length;

    if (playersCount < 2) { return assassinsCount > 0; }
    if (playersCount === 3 && game.clock % 16 === 0) { return assassinsCount > 0; }

    return 2 * assassinsCount >= playersCount;
  },
});
