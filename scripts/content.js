chrome.storage.sync.get(['enabled'], ({ enabled }) => {
  if (enabled !== 'false') {
    const snowConfig = {
      color: [161 / 255, 197 / 255, 231 / 255],
      count: 300,
      opacity: 0.5,
      density: 1 / 50,
      speed: 1 / 10000
    };

    new SnowProgram(document.body, snowConfig).render();
  }
});
