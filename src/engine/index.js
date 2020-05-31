import { observable } from 'mobx';
import Role from '../roles';
import Player from './player';

export default class Engine {
  constructor(recipe, setGameState) {
    this.state = observable({
      roles: recipe.roles.map(Role),
      players: recipe.players.map(Player),
      action: {},
      stack: [],
      clock: 0,
    });

    this.setGameState = setGameState;
    setGameState(this.state);
    setTimeout(() => this.nextTick());
  }

  nextTick() {
    this.state.clock = this.state.clock + 1;
    this.state.roles.forEach((role) => {
      const timeAction = this.currentTimeAction(role);
      if (timeAction) {
        const action = timeAction(this.state);
        if (action) { this.state.stack.push(action); }
      }
    });

    setTimeout(() => this.nextAction());
  }

  currentTimeAction(role) {
    const currentTime = this.state.clock % 16;
    return role.actions[`t${currentTime}`];
  }

  nextAction() {
    if (this.state.stack.length === 0) {
      this.state.action = {};
      this.setGameState(this.state);

      return this.nextTick();
    }
    const action = this.state.stack.splice(0, 1)[0];
    this.state.action = action(this.state);
    this.setGameState(this.state);
    return null;
  }

  commit() {
    this.state.action.emblems.forEach((e) => {
      e.resolve(e.target, this.state, () => { this.setGameState(this.state); });
    });
    if (this.state.action.resolve) { this.state.action.resolve(); }
    this.nextAction();
  }
}
