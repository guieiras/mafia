import appendRoleDiscover from './events/appendRoleDiscover';

export default ({
  id: 'suspect',
  actions: {
    identifyRoles: appendRoleDiscover('suspect'),
    investigationFailed: (event) => {
      if (event.target.role === 'suspect') {
        event.name = 'investigationSuccess';
      }
      return event;
    },
  },
});
