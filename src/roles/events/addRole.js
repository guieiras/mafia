import { observable } from 'mobx';
import i18n from '../../i18n';

export default function addRole(role, options = {}) {
  return observable({
    icon: 'person',
    description: i18n.roles[role],
    validateTarget: (target) => target.role === 'generic',
    valid: (e) => !!e.target,
    resolve(target, game, commit) {
      if (options.beforeResolve) { options.beforeResolve(target, game); }
      target.role = role;
      if (options.afterResolve) { options.afterResolve(target, game); }
      commit();
    },
  });
}
