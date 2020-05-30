import addRole from './events/addRole';
import onDay from './events/onDay';

export default ({
  id: 'narrator',
  actions: {
    t1: onDay(0, discoverNarrator)
  }
});

function discoverNarrator() {
  return {
    name: 'discoverNarrator',
    emblems: [
      addRole('narrator', {
        afterResolve(target) { target.state = 'hidden'; }
      })
    ]
  };
}
