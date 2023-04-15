export default class ThemeMode {
  constructor() {
    this.mode = 'light';
    this.button = document.getElementById('toogle-dark-mode');
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

    const newIcon = document.createElement('i');
    newIcon.className = iconClass;

    this.button.replaceChild(newIcon, document.querySelector('i'));
    this.button.style.background = shadowColor;
    this.button.style.color = iconColor;

    document
      .querySelectorAll('.post')
      .forEach(
        (post) => (post.style.boxShadow = `3px 4px 3px 4px ${shadowColor}`)
      );

    this.mode = newMode;
    localStorage.setItem('mode', this.mode);
  }
}
