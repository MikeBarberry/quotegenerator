import { createElement } from '../utils/index.js';

export default class ThemeMode {
  constructor() {
    this.mode = 'light';
    this.button = document.getElementById('toogle-dark-mode');
    this.init();
  }

  init() {
    this.button.addEventListener('click', () => {
      const isLight = this.mode === 'light';
      const modeOptions = {
        newMode: isLight ? 'dark' : 'light',
        shadowColor: isLight ? 'white' : 'black',
        iconClass: `fa fa-${isLight ? 'sun' : 'moon'}-o`,
        iconColor: isLight ? 'black' : 'white',
      };
      this.changeMode(modeOptions);
    });
  }

  changeMode({ newMode, shadowColor, iconClass, iconColor }) {
    document.querySelector('body').classList.toggle('darkMode');

    Object.assign(this.button, {
      style: {
        color: iconColor,
        background: shadowColor,
      },
    });

    this.button.replaceChild(
      createElement('i', {
        className: iconClass,
      }),
      document.querySelector('i')
    );

    document
      .querySelectorAll('.post')
      .forEach(
        (post) => (post.style.boxShadow = `3px 4px 3px 4px ${shadowColor}`)
      );

    this.mode = newMode;
    localStorage.setItem('mode', this.mode);
  }
}
