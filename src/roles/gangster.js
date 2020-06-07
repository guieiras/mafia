import appendRoleDiscover from './events/appendRoleDiscover';
import onDay from './events/onDay';

export default ({
  id: 'gangster',
  icon: 'baseball-bat',
  team: 'neutral',
  actions: {
    t4: onDay(0, (game) => appendRoleDiscover('gangster')({
      name: 'gangstersWake',
      emblems: [],
    }, game)),
  },
  win(state) {
    const gangsters = state.players.filter((player) => player.role === 'gangster');

    return gangsters.length > 0
      && gangsters.filter((player) => player.state === 'active').length === 1;
  },
});
