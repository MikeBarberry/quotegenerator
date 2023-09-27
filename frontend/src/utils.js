DarkReader.setFetchMethod(window.fetch);

// Add event listener to change
// mode.
const modeButton = document.getElementById('modebutton');
modeButton.addEventListener('click', () => {
  changeMode();
});

// Mode change logic.
function changeMode() {
  const modes = {
    dark: {
      icon: 'moon',
      darkReaderConfig: { brightness: 100, contrast: 90, sepia: 10 },
    },
    light: {
      icon: 'sun',
      darkReaderConfig: null,
    },
  };
  const oppositeMode = (currentMode) => {
    if (currentMode === 'dark') {
      return 'light';
    } else if (currentMode === 'light') {
      return 'dark';
    }
  };
  const button = document.getElementById('modebutton');
  const mode = button.getAttribute('data-mode');

  const changingToIcon = modes[mode].icon;
  const changingToMode = oppositeMode(mode);

  const newIcon = `<i class="fa fa-${changingToIcon}-o"></i>`;

  const darkReaderConfig = modes[changingToMode].darkReaderConfig;
  if (darkReaderConfig) {
    DarkReader.enable(darkReaderConfig);
  } else {
    DarkReader.disable();
  }

  button.setAttribute('data-mode', changingToMode);
  button.innerHTML = newIcon;
}

// Show server message
// after add or delete.
export const displayServerMessage = (action, message) => {
  const colors = {
    deleted: 'lightcoral',
    added: 'mediumseagreen',
  };
  const messageContainer = document.getElementById('messageContainer');
  const defaultStyle =
    'height: 30px; font-weight: bolder; font-family: Space Mono; font-size: 16px;';
  messageContainer.setAttribute(
    'style',
    defaultStyle.concat(` color: ${colors[action]};`)
  );
  const text = document.createTextNode(message);
  messageContainer.append(text);
  setTimeout(() => {
    text.remove();
  }, 2000);
};

// Create custom element with
// attributes.
export const createCustomElement = (element, attributes) => {
  const customElement = document.createElement(element);
  for (const [name, value] of attributes) {
    customElement.setAttribute(name, value);
  }
  return customElement;
};
