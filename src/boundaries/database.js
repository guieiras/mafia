import Dexie from 'dexie';

const db = new Dexie('mafia-moderator');

db.version(1).stores({
  games: 'id',
  groups: 'id',
});

export default db;
