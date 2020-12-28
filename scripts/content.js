const snowConfig = {
  color: [161 / 255, 197 / 255, 231 / 255],
  count: 300,
  opacity: 0.5,
  density: 1 / 50,
  speed: 1 / 10000
};
let snowProgram = null;

const renderSnow = () => {
  snowProgram = new SnowProgram(document.body, snowConfig).render();
}

chrome.storage.sync.get(['enabled'], ({ enabled }) => {
  if (enabled !== false) {
    renderSnow();
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.enabled) {
    if (changes.enabled.newValue) {
      renderSnow();
    } else {
      snowProgram.stop();
      document.body.removeChild(snowProgram.$canvas);
    }
  }
});
