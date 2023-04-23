import { apiURL } from '../utils/constants.js';

export default class Quote {
  constructor(show, quote) {
    this.parent = show;
    this.createQuote(quote, this.parent.node);
  }

  createQuote(quote, parentNode) {
    const boundDeleteMessage = this.parent.deleteMessage.bind(this.parent);

    const button = document.createElement('button');
    button.setAttribute('class', 'deleteButton');
    button.innerText = 'Delete';
    button.addEventListener('click', function () {
      fetch(`${apiURL}/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: quote.id,
        }),
      })
        .then((resp) => resp.json())
        .then((json) =>
          boundDeleteMessage(json.message.note, json.message.quote.id)
        );
    });

    const li = document.createElement('li');
    li.setAttribute('id', quote.id);
    li.innerText = quote.quote;
    li.append(button);

    parentNode.append(li);
  }
}
