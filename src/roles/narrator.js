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

export default ({
  id: 'narrator',
  actions: {
    t1: onDay(0, discoverNarrator),
    t2: () => citySleeps,
  },
});
