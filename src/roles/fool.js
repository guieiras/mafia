import appendRoleDiscover from './events/appendRoleDiscover';

export default ({
  id: 'fool',
  actions: {
    identifyRoles: appendRoleDiscover('fool'),
    playerLynch: (event) => {
      const originalEvent = event.emblems[0].resolve;
      event.emblems[0].resolve = (target, game, commit) => {
        originalEvent(target, game, commit);
        if (target && target.role === 'fool') { target.emblems.fool = true; }
        commit();
      };

      return event;
    },
  },
  win(state) {
    return state.players.filter((player) => player.emblems.fool).length > 0;
  },
});
