export default function setTarget(emblem, player) {
  const validateTarget = emblem.validateTarget || ((target) => target.state === 'active');

  if (!player || validateTarget(player)) {
    emblem.target = player;
  }
}
