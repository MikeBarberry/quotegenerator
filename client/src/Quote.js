import { apiURL } from '../utils/constants.js';
import { createElement } from '../utils/index.js';

export default class Quote {
  constructor(parentShow) {
    this.parentShow = parentShow;
  }

  createQuoteUI(quote) {
    const handleDeleteQuote = async () => {
      const res = await fetch(`${apiURL}/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: quote.id,
        }),
      });
      const json = await res.json();
      this.parentShow.deleteQuoteMessage.call(
        this.parentShow,
        json.message.note,
        json.message.quote.id
      );
    };

    const deleteQuoteButton = createElement('button', {
      onclick: handleDeleteQuote,
      className: 'deleteButton',
      innerText: 'Delete',
    });

    const quoteContent = createElement('li', {
      id: quote.id,
      innerText: quote.quote,
    });

    quoteContent.append(deleteQuoteButton);
    this.parentShow.quotesList.append(quoteContent);
  }
}
