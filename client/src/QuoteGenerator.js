import { Show, Quote } from './index.js';
import { apiURL } from '../utils/constants.js';

export default class QuoteGenerator {
  constructor() {
    this.loaded = false;
  }

  async init() {
    const response = await fetch(apiURL.concat('/'));
    const json = await response.json();

    this.loaded = true;

    document.getElementById('loading').toggleAttribute('hidden');

    for (const element of json) {
      const show = new Show(element);
      show.buildShowUI(document.getElementById('post-container'));

      for (let idx = 0; idx < element.quotes.length; idx++) {
        const quote = new Quote(show);
        quote.createQuoteUI(element.quotes[idx]);
      }
    }
  }
}
