export default function setTarget(emblem, player) {
  const validateTarget = emblem.validateTarget || ((target) => target.state === 'active');
  if (validateTarget(player)) {
    emblem.target = player;
  }
}
