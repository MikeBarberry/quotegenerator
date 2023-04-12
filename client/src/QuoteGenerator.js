import Show from './Show.js';
import { apiURL } from '../utils/index.js';

export default class QuoteGenerator {
  async init() {
    const response = await fetch(`${apiURL}/`);
    const json = await response.json();
    document.getElementById('loading').toggleAttribute('hidden');
    for (const element of json) {
      const show = new Show(element);
      show.buildQuotes(element.quotes);
    }
  }
}
