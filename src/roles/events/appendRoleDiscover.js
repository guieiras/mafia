import addRole from './addRole';

export default function appendRoleDiscover(role) {
  return (event, game) => {
    if (event.autoResolve) { event.autoResolve = false; }
    if (!event.emblems) { event.emblems = []; }
    game.chosenRoles
      .filter((r) => r === role)
      .forEach(() => { event.emblems.push(addRole(role)); });

    return event;
  };
}
