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
import i18n from '../i18n';

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
  [Assassin, { amount: 3, index: 5, force: 1 }],
  [Angel, { amount: 1, index: 7 }],
  [Detective, { amount: 1, index: 13 }],
  [Bodyguard, { amount: 1, index: 8 }],
  [Bulletproof, { amount: 1, index: 9 }],
  [Emergency, { amount: 1, index: 10 }],
  [Hunter, { amount: 1, index: 2 }],
  [Protector, { amount: 1, index: 11 }],
  [Suspect, { amount: 1, index: 1 }],
  [Mafioso, { amount: 2, index: 6 }],
  [Lawyer, { amount: 1, index: 12 }],
  [Milician, { amount: 1, index: 14 }],
  [Kidnapper, { amount: 1, index: 15 }],
  [Fool, { amount: 2, index: 3 }],
  [Gangster, { amount: 3, index: 4 }],
];

export function libraryToGameRecipe(selectedRoles) {
  return [...RoleLibrary]
    .sort((a, b) => ((a[1].index > b[1].index) ? 1 : -1))
    .reduce((memo, [role]) => [
      ...memo, ...new Array(selectedRoles[role.id] || 0).fill(role.id),
    ], ['narrator']);
}

export function defaultSetups() {
  return [
    {
      id: 'standard',
      name: i18n.t('setups.standard'),
      players: 5,
      roles: { assassin: 1, angel: 1, detective: 1 },
    },
    {
      id: 'standard',
      name: i18n.t('setups.standard'),
      players: 6,
      roles: { assassin: 1, angel: 1, detective: 1 },
    },
    {
      id: 'standard',
      name: i18n.t('setups.standard'),
      players: 7,
      roles: {
        assassin: 1, angel: 1, detective: 1, bodyguard: 1,
      },
    },
    {
      id: 'standard',
      name: i18n.t('setups.standard'),
      players: 8,
      roles: {
        assassin: 2, angel: 1, detective: 1, bodyguard: 1,
      },
    },
    {
      id: 'standard',
      name: i18n.t('setups.standard'),
      players: 9,
      roles: {
        assassin: 2, angel: 1, detective: 1, bodyguard: 1, bulletproof: 1,
      },
    },
    {
      id: 'standard',
      name: i18n.t('setups.standard'),
      players: 10,
      roles: {
        assassin: 2, kidnapper: 1, angel: 1, detective: 1, bodyguard: 1, bulletproof: 1,
      },
    },
    {
      id: 'competitive',
      name: i18n.t('setups.competitive'),
      players: 10,
      roles: {
        assassin: 2,
        mafioso: 2,
        kidnapper: 1,
        angel: 1,
        detective: 1,
        bodyguard: 1,
        bulletproof: 1,
        hunter: 1,
      },
    },
  ];
}
