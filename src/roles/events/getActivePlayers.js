export default function getActivePlayers(players) {
  return players.filter((player) => player.state === 'active');
}
