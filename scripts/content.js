const snowConfig = {
  color: [100 / 256, 130 / 256, 250 / 256],
  count: 1000,
  opacity: 0.8,
  gravity: 100,
};
let snowProgram = null;

const removeSnow = () => {
  if (snowProgram) {
    snowProgram.stop();
    document.body.removeChild(snowProgram.$canvas);
  }
};
const renderSnow = () => {
  snowProgram = new SnowProgram(document.body, snowConfig).render();
};

chrome.storage.sync.get(['enabled', 'opacity', 'count', 'gravity', 'color'], values => {
  const { enabled, opacity, count, gravity, color } = values;

  if (opacity || opacity === 0) { snowConfig.opacity = opacity; }
  if (count || count === 0) { snowConfig.count = count; }
  if (gravity || gravity === 0) { snowConfig.gravity = gravity; }
  if (color || color === 0) { snowConfig.color = color.map(c => c / 256); }
  if (enabled !== false) { renderSnow(); }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync') {
    if (changes.enabled) {
      if (changes.enabled.newValue) {
        renderSnow();
      } else {
        removeSnow();
      }
    } else {
      if (changes.opacity) { snowProgram.opacity = changes.opacity.newValue; }
      if (changes.count) { snowProgram.count = changes.count.newValue; }
      if (changes.gravity) { snowProgram.gravity = changes.gravity.newValue; }
      if (changes.color) { snowProgram.color = changes.color.newValue.map(c => c / 256); }

      snowProgram.render();
    }
  }
});
