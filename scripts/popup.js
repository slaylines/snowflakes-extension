const debounce = (func, delay = 100) => {
  let timerId;

  return (...args) => {
    if (timerId) { clearTimeout(timerId); }
    timerId = setTimeout(() => {
      func(...args);
      timerId = null;
    }, delay);
  }
}

const colorToHex = (c) => {
  const hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
};

window.addEventListener('DOMContentLoaded', () => {
  const enabledSwitch = document.querySelector('.switch input');
  const notSpan = document.querySelector('.switch span');

  enabledSwitch.addEventListener('change', debounce(event => {
    notSpan.style.display = event.target.checked ? 'none' : 'inline';
    chrome.storage.sync.set({ enabled: event.target.checked });
  }));

  const opacitySliderRange = document.querySelector('.opacity-slider input');
  const opacitySliderValue = document.querySelector('.opacity-slider span');

  opacitySliderRange.addEventListener('input', debounce(event => {
    const { value } = event.target;
    chrome.storage.sync.set({ opacity: event.target.value / 100 });
    opacitySliderValue.innerText = `${value}%`;
  }));

  const countSliderRange = document.querySelector('.count-slider input');
  const countSliderValue = document.querySelector('.count-slider span');

  countSliderRange.addEventListener('input', debounce(event => {
    const { value } = event.target;
    chrome.storage.sync.set({ count: value });
    countSliderValue.innerText = value;
  }));

  const gravitySliderRange = document.querySelector('.gravity-slider input');
  const gravitySliderValue = document.querySelector('.gravity-slider span');

  gravitySliderRange.addEventListener('input', debounce(event => {
    const { value } = event.target;
    chrome.storage.sync.set({ gravity: value });
    gravitySliderValue.innerText = value;
  }));

  const colorPickerControl = document.querySelector('.color-picker input');
  const colorPickerValue = document.querySelector('.color-picker span');

  colorPickerControl.addEventListener('input', debounce(event => {
    const { value } = event.target;
    const r = parseInt(value.substr(1, 2), 16);
    const g = parseInt(value.substr(3, 2), 16);
    const b = parseInt(value.substr(5, 2), 16);

    chrome.storage.sync.set({ color: [r, g, b] });
    colorPickerValue.innerText = value;
  }));

  chrome.storage.sync.get(['enabled', 'opacity', 'count', 'gravity', 'color'], values => {
    const { enabled, opacity, count, gravity, color } = values;

    notSpan.style.display = enabled !== false ? 'none' : 'inline';
    enabledSwitch.checked = enabled !== false;

    const opacityValue = opacity || opacity === 0
      ? Math.round(opacity * 100)
      : opacitySliderRange.value;

    opacitySliderRange.value = opacityValue;
    opacitySliderValue.innerText = `${opacityValue}%`;

    const countValue = count || count === 0 ? count : countSliderRange.value;

    countSliderRange.value = countValue;
    countSliderValue.innerText = countValue;

    const gravityValue = gravity || gravity === 0 ? gravity : gravitySliderRange.value;

    gravitySliderRange.value = gravityValue;
    gravitySliderValue.innerText = gravityValue;

    const colorValue = color && color.length === 3
     ? `#${colorToHex(color[0])}${colorToHex(color[1])}${colorToHex(color[2])}`
     : colorPickerControl.value;

    colorPickerControl.value = colorValue;
    colorPickerValue.innerText = colorValue;

  });
});
