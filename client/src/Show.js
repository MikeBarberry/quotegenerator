import Quote from './Quote.js';
import { lambdaURL } from '../utils/constants.js';
import { createElement } from '../utils/index.js';

export default class Show {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.createContainerElements();
  }

  createContainerElements() {
    const containerDiv = createElement('div', {
      className: 'post',
      id: this.id,
    });
    const quotesList = createElement('ul', {
      className: 'quoteList',
      id: 'quote-list'.concat(this.id),
    });
    this.containerDiv = containerDiv;
    this.quotesList = quotesList;
  }

  buildShowUI(root) {
    const handleAddQuote = async () => {
      const res = await fetch(lambdaURL.concat('/add'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.id,
        }),
      });
      const json = await res.json();
      const { message, inserted } = json;
      this.handleAddQuote(message, inserted);
    };

    const addQuoteButton = createElement('button', {
      onclick: handleAddQuote,
      className: 'addButton',
      innerText: 'Add',
    });

    const showNameHeader = createElement('h2', {
      innerText: this.name,
    });

    this.containerDiv.append(addQuoteButton, showNameHeader, this.quotesList);
    root.append(this.containerDiv);
  }

  handleAddQuote(message, { id, content }) {
    document.getElementById('add-success').innerText = message;
    setTimeout(() => {
      document.getElementById('add-success').innerText = '';
    }, 1500);

    const quote = new Quote(this);
    quote.buildQuoteUI(id, content);
  }

  handleDeleteQuote(message, id) {
    document.getElementById('delete-success').innerText = message;
    setTimeout(() => {
      document.getElementById('delete-success').innerText = '';
    }, 1500);

    this.quotesList.removeChild(document.getElementById(id));
  }
}
