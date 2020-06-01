export default function getPlayerByRole(players, role) {
  return players.filter((player) => player.role === role)[0];
}
