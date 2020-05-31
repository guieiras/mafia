import { v1 as uuidV1 } from 'uuid';
import { observable } from 'mobx';

export default function Player(name) {
  return {
    id: uuidV1(),
    name,
    role: 'generic',
    state: 'active',
    emblems: observable({}),
  };
}
