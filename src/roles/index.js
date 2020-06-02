import Angel from './angel';
import Assassin from './assassin';
import Bodyguard from './bodyguard';
import Bulletproof from './bulletproof';
import Detective from './detective';
import Generic from './generic';
import Hunter from './hunter';
import Narrator from './narrator';
import Suspect from './suspect';

const roles = [
  Angel,
  Assassin,
  Bodyguard,
  Bulletproof,
  Detective,
  Hunter,
  Narrator,
  Suspect,
];

export default function Role(id) {
  return roles.filter((role) => role.id === id)[0] || Generic;
}
