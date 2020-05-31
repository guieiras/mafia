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

export default ({
  id: 'narrator',
  actions: {
    t1: onDay(0, discoverNarrator),
  },
});
