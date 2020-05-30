import Generic from './generic';
import Narrator from './narrator';

const roles = [
  Narrator,
];

export default function Role(id) {
  return roles.filter((role) => role.id === id)[0] || Generic;
}
