import { Show, Quote } from './index.js';
import { lambdaURL } from '../utils/constants.js';

export default class QuoteGenerator {
  constructor() {
    this.loaded = false;
    this.showsContainer = document.getElementById('shows-container');
  }

  async init() {
    const response = await fetch(lambdaURL.concat('/'));
    const json = await response.json();

    this.loaded = true;
    document.getElementById('loading').toggleAttribute('hidden');

    for (const { showId, name, showQuotes } of json) {
      const show = new Show(showId, name);
      show.buildShowUI(this.showsContainer);

      for (const { id, content } of showQuotes) {
        const quote = new Quote(show);
        quote.buildQuoteUI(id, content);
      }
    }
  }
}
