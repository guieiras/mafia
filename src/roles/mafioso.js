import appendRoleDiscover from './events/appendRoleDiscover';

export default ({
  id: 'mafioso',
  icon: 'tie',
  team: 'mafia',
  actions: {
    assassinWake: (event, game) => {
      if (event.emblems.length === 1) { return event; }
      return appendRoleDiscover('mafioso')(event, game);
    },
  },
});
