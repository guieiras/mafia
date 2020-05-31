export default function onDay(day, fn) {
  return (game) => {
    const currentDay = Math.floor(game.clock / 16);
    if (typeof day === 'function') {
      return day(currentDay) ? fn : undefined;
    }
    return currentDay === day ? fn : undefined;
  };
}
