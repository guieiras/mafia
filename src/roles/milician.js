import basicWake from './events/basicWake';

function milicianWake(game) {
  return {
    name: 'milicianWake',
    events: game.players.reduce((memo, player) => {
      if (player.investigated) {
        delete player.investigated;
        return [...memo, ['detective', player]];
      }
      return memo;
    }, []),
    emblems: [],
  };
}

export default ({
  id: 'milician',
  actions: {
    t7: basicWake(milicianWake, 'milician'),
    investigationSuccess: (event) => {
      event.target.investigated = true;
      return event;
    },
    investigationFailed: (event) => {
      event.target.investigated = true;
      return event;
    },
  },
});
