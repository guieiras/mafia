import addRole from './addRole';

export default function appendRoleDiscover(role) {
  return (event) => {
    if (event.autoResolve) { event.autoResolve = false; }
    if (!event.emblems) { event.emblems = []; }
    event.emblems.push(addRole(role));
    return event;
  };
}
