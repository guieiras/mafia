import I18n from '../../i18n';

export default function addRole(role, options) {
  return {
    icon: 'person',
    description: I18n.roles[role],
    resolve(target, game, commit) {
      if (options.beforeResolve) { options.beforeResolve(target, game); }
      target.role = role;
      if (options.afterResolve) { options.afterResolve(target, game); }
      commit();
    }
  }
}
