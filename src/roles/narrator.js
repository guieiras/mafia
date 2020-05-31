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
  };
}

function cityWakeup() {
  return {
    name: 'cityWakeup',
    emblems: [],
  };
}

function playerLynch() {
  return {
    name: 'playerLynch',
    emblems: [
      observable({
        icon: 'guillotine',
        description: i18n.emblems.lynch,
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
    t11: () => cityWakeup,
    t12: () => playerLynch,
  },
  win(state) {
    const assassins = state.players.filter((player) => player.role === 'assassin');

    return assassins.length > 0
      && assassins.filter((player) => player.state === 'active').length === 0;
  },
});
