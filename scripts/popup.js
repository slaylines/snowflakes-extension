window.addEventListener('DOMContentLoaded', () => {
  const enabledSwitch = document.querySelector('.snowflakes-popup input');
  const notSpan = document.querySelector('.snowflakes-popup div span');

  chrome.storage.sync.get(['enabled'], ({ enabled }) => {
    notSpan.style.display = enabled !== false ? 'none' : 'inline';
    enabledSwitch.checked = enabled !== false;
  });

  enabledSwitch.addEventListener('change', event => {
    notSpan.style.display = event.target.checked ? 'none' : 'inline';
    chrome.storage.sync.set({ enabled: event.target.checked });
  });
});
