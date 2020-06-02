import { observable } from 'mobx';
import Role from '../roles';
import Player from './player';

export default class Engine {
  constructor(recipe, setGameState) {
    this.state = observable({
      chosenRoles: recipe.roles,
      roles: [...new Set(recipe.roles)].map(Role),
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
    if (this.reachedSomeWinCondition()) { return null; }
    if (this.state.stack.length === 0) {
      this.state.action = {};
      this.setGameState(this.state);

      return this.nextTick();
    }
    const action = this.state.stack.splice(0, 1)[0];
    this.state.action = this.state.roles.reduce((memo, role) => {
      if (role.actions[memo.name]) { return role.actions[memo.name](memo); }
      return memo;
    }, action(this.state));

    if (this.state.action.autoResolve) {
      this.commit();
    } else {
      this.setGameState(this.state);
    }
    return null;
  }

  commit() {
    if (this.state.action.emblems) {
      this.state.action.emblems.forEach((e) => {
        e.resolve(e.target, this.state, () => { this.setGameState(this.state); });
      });
    }

    if (this.state.action.resolve) {
      this.state.action.resolve(this.state, () => { this.setGameState(this.state); });
    }
    this.nextAction();
  }

  reachedSomeWinCondition() {
    return this.state.roles.some((role) => {
      const win = role.win && role.win(this.state);

      if (win) {
        this.state.action = {
          name: `${role.id}Win`,
        };
        this.setGameState(this.state);

        return true;
      }

      return false;
    });
  }
}
