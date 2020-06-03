import { observable } from 'mobx';
import i18n from '../i18n';
import addRole from './events/addRole';
import onDay from './events/onDay';

function discoverNarrator() {
  return {
    name: 'discoverNarrator',
    emblems: [
      addRole('narrator', {
        afterResolve(target) { target.state = 'hidden'; },
      }),
    ],
  };
}

function citySleeps() {
  return {
    name: 'citySleeps',
    emblems: [],
    resolve(game, commit) {
      game.events = [];
      commit();
    },
  };
}

function cityWakeup(state) {
  return {
    name: 'cityWakeup',
    events: state.events,
    emblems: [],
  };
}

function identifyRoles() {
  return {
    name: 'identifyRoles',
    autoResolve: true,
  };
}

function playerLynch() {
  return {
    name: 'playerLynch',
    emblems: [
      observable({
        icon: 'guillotine',
        description: i18n.emblems.lynch,
        validateTarget: (player) => player.state === 'active',
        valid: () => true,
        resolve(target, game, commit) {
          if (target) { target.state = 'dead'; }
          commit();
        },
      }),
    ],
  };
}

export default ({
  id: 'narrator',
  actions: {
    t1: onDay(0, discoverNarrator),
    t2: () => citySleeps,
    t3: onDay(0, identifyRoles),
    t12: () => cityWakeup,
    t13: () => playerLynch,
  },
  win(state) {
    const assassins = state.players.filter((player) => player.role === 'assassin');

    return assassins.length > 0
      && assassins.filter((player) => player.state === 'active').length === 0;
  },
});
