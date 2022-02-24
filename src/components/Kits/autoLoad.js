const requireComponent = require.context('./modules', true, /\w+\.(vue|js)$/);

const cmps = [];

requireComponent.keys().map(fileName => {
  let cmp = requireComponent(fileName).default;
  cmps.push(cmp.name);
});

module.exports = {
  cmps,
}
