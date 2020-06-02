import appendRoleDiscover from './events/appendRoleDiscover';

export default ({
  id: 'mafioso',
  actions: {
    assassinWake: (event, state) => {
      if (event.emblems.length === 1) { return event; }
      return state
        .chosenRoles
        .filter((r) => r === 'mafioso')
        .reduce(appendRoleDiscover('mafioso'), event);
    },
  },
});
