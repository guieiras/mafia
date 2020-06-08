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

export const RoleLibrary = [
  [Narrator, { amount: 1, index: 0, force: 1 }],
  [Assassin, { amount: 3, index: 5, force: 1 }],
  [Angel, { amount: 1, index: 7 }],
  [Detective, { amount: 1, index: 13 }],
  [Bodyguard, { amount: 1, index: 8 }],
  [Bulletproof, { amount: 1, index: 9 }],
  [Emergency, { amount: 1, index: 10 }],
  [Hunter, { amount: 1, index: 2 }],
  [Lawyer, { amount: 1, index: 12 }],
  [Protector, { amount: 1, index: 11 }],
  [Suspect, { amount: 1, index: 1 }],
  [Mafioso, { amount: 2, index: 6 }],
  [Milician, { amount: 1, index: 14 }],
  [Kidnapper, { amount: 1, index: 15 }],
  [Fool, { amount: 2, index: 3 }],
  [Gangster, { amount: 3, index: 4 }],
];

export function libraryToGameRecipe(selectedRoles) {
  return [...RoleLibrary]
    .sort((a, b) => ((a[1].index > b[1].index) ? 1 : -1))
    .reduce((memo, [role]) => [...memo, ...new Array(selectedRoles[role.id]).fill(role.id)], []);
}
