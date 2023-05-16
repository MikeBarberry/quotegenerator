import { lambdaURL } from '../utils/constants.js';
import { createElement } from '../utils/index.js';

export default class Quote {
  constructor(parentShow) {
    this.parentShow = parentShow;
  }

  buildQuoteUI(id, content) {
    const handleDeleteQuote = async () => {
      const res = await fetch(lambdaURL.concat('/delete'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      const json = await res.json();
      const { message, deleted } = json;
      this.parentShow.handleDeleteQuote.call(
        this.parentShow,
        message,
        deleted.id
      );
    };

    const deleteQuoteButton = createElement('button', {
      onclick: handleDeleteQuote,
      className: 'deleteButton',
      innerText: 'Delete',
    });

    const quoteContent = createElement('li', {
      id: id,
      innerText: content,
    });

    quoteContent.append(deleteQuoteButton);
    this.parentShow.quotesList.append(quoteContent);
  }
}
