import Angel from './angel';
import Assassin from './assassin';
import Bodyguard from './bodyguard';
import Detective from './detective';
import Generic from './generic';
import Narrator from './narrator';

const roles = [
  Angel,
  Assassin,
  Bodyguard,
  Detective,
  Narrator,
];

export default function Role(id) {
  return roles.filter((role) => role.id === id)[0] || Generic;
}
