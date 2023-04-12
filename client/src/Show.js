import Quote from './Quote.js';
import { apiURL } from '../utils/index.js';

export default class Show {
  constructor(show) {
    this.container = this.createShow(show);
  }

  createShow(show) {
    const boundAddMessage = this.addMessage.bind(this);

    const button = document.createElement('button');
    button.innerText = 'Add';
    button.setAttribute('class', 'addButton');
    button.addEventListener('click', function () {
      fetch(`${apiURL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: show.id,
        }),
      })
        .then((resp) => resp.json())
        .then((confirmation) => {
          boundAddMessage(confirmation.message);
        });
    });

    const h2 = document.createElement('h2');
    h2.innerText = show.name;

    const ul = document.createElement('ul');
    ul.setAttribute('class', 'quoteList');
    ul.setAttribute('id', `quote-list-${show.id}`);

    const div = document.createElement('div');
    div.setAttribute('class', 'post');
    div.setAttribute('id', show.id);
    div.append(button, h2, ul);

    document.getElementById('post-container').append(div);

    return ul;
  }

  buildQuotes(quotes) {
    for (const element of quotes) {
      const quote = new Quote(this);
      quote.createQuote(element, this.container);
    }
  }

  addMessage(confirmation) {
    document.getElementById('add-success').innerText = confirmation.note;
    setTimeout(() => {
      document.getElementById('add-success').innerText = '';
    }, 1500);

    const quote = new Quote(this);
    quote.createQuote(confirmation.quote, this.container);
  }

  deleteMessage(confirmation) {
    document.getElementById('delete-success').innerText = confirmation.note;
    setTimeout(() => {
      document.getElementById('delete-success').innerText = '';
    }, 1500);

    this.container.removeChild(document.getElementById(confirmation.quote.id));
  }
}
