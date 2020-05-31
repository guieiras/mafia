import { v1 as uuidV1 } from 'uuid';

export default function Player(name) {
  return {
    id: uuidV1(),
    name,
    role: 'generic',
    state: 'active',
    emblems: [],
  };
}
