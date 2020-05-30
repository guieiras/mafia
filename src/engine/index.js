import Role from '../roles'
import Player from './player'
import { observable } from 'mobx';

export default class Engine {
  constructor(recipe, setGameState) {
    this.state = observable({
      roles: recipe.roles.map(Role),
      players: recipe.players.map(Player),
      action: {},
      stack: [],
      clock: 0
    });

    this.setGameState = setGameState;
    setGameState(this.state);
    setTimeout(() => this.nextTick());
  }

  nextTick() {
    this.state.clock++;
    this.state.roles.forEach((role) => {
      const timeAction = this.currentTimeAction(role);
      if (timeAction) {
        const action = timeAction(this.state);
        if (action) { this.state.stack.push(action); }
      }
    });

    this.nextAction();
  }

  currentTimeAction(role) {
    const currentTime = this.state.clock % 16;
    return role.actions[`t${currentTime}`];
  }

  nextAction() {
    if (this.state.stack.length === 0) { this.nextTick(); }
    const action = this.state.stack.splice(0, 1)[0];
    this.state.action = action(this.state);
    this.state.action.resolve = this.nextAction;
    this.setGameState(this.state);
  }
}
