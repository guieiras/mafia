import Angel from './angel';
import Assassin from './assassin';
import Bodyguard from './bodyguard';
import Bulletproof from './bulletproof';
import Detective from './detective';
import Emergency from './emergency';
import Fool from './fool';
import Gangster from './gangster';
import Generic from './generic';
import Hunter from './hunter';
import Lawyer from './lawyer';
import Kidnapper from './kidnapper';
import Mafioso from './mafioso';
import Milician from './milician';
import Narrator from './narrator';
import Protector from './protector';
import Suspect from './suspect';

const roles = [
  Angel,
  Assassin,
  Bodyguard,
  Bulletproof,
  Detective,
  Emergency,
  Fool,
  Gangster,
  Hunter,
  Kidnapper,
  Lawyer,
  Mafioso,
  Milician,
  Narrator,
  Protector,
  Suspect,
];

export default function Role(id) {
  return roles.filter((role) => role.id === id)[0] || Generic;
}
