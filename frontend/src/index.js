import { Show, Quote } from './customElements.js';
import { API_URL } from './constants.js';
import { createCustomElement } from './utils.js';

// Define custom elements.
if (!customElements.get('quotegen-show')) {
  customElements.define('quotegen-show', Show);
}
if (!customElements.get('quotegen-quote')) {
  customElements.define('quotegen-quote', Quote);
}

// Fetch data and
// render.
(async () => {
  const root = document.getElementById('root');

  const response = await fetch(API_URL);
  const json = await response.json();

  const loading = document.getElementById('loading');
  loading.setAttribute('style', `display: none;`);

  for (const { showId, showQuotes, name } of json) {
    const show = createCustomElement('quotegen-show', [
      ['name', name],
      ['id', showId],
    ]);
    root.append(show);
    for (const { id, content } of showQuotes) {
      const quote = createCustomElement('quotegen-quote', [
        ['quote', content],
        ['id', id],
      ]);
      show.quotes.append(quote);
    }
  }
})();
