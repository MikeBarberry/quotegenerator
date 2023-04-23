import Quote from './Quote.js';
import { apiURL } from '../utils/constants.js';

export default class Show {
  constructor(show) {
    this.id = show.id;
    this.name = show.name;
    this.node = this.createShow(show);
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
        .then((json) => {
          boundAddMessage(json.message.note, json.message.quote);
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

  addMessage(message, quote) {
    document.getElementById('add-success').innerText = message;
    setTimeout(() => {
      document.getElementById('add-success').innerText = '';
    }, 1500);

    new Quote(this, quote);
  }

  deleteMessage(message, id) {
    document.getElementById('delete-success').innerText = message;
    setTimeout(() => {
      document.getElementById('delete-success').innerText = '';
    }, 1500);

    this.node.removeChild(document.getElementById(id));
  }
}
