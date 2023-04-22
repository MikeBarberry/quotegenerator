import { Show, Quote } from './index.js';
import { apiURL } from '../utils/index.js';

export default class QuoteGenerator {
  constructor() {
    this.loaded = false;
  }

  async init() {
    const response = await fetch(`${apiURL}/`);
    const json = await response.json();
    this.loaded = true;
    document.getElementById('loading').toggleAttribute('hidden');
    for (const element of json) {
      const show = new Show(element);
      for (let idx = 0; idx < element.quotes.length; idx++) {
        const quote = element.quotes[idx];
        new Quote(show, quote);
      }
    }
  }
}
