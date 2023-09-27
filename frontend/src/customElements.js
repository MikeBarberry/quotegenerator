import { API_URL } from './constants.js';
import { createCustomElement, displayServerMessage } from './utils.js';

// Connected callbacks are
// invoked each time the custom
// element is appended into a
// document-connected element.
// It is at this point its
// attributes can be accessed.

export class Show extends HTMLElement {
  constructor() {
    super();

    // Attach shadow DOM.
    const shadow = this.attachShadow({ mode: 'open' });

    // Create ul element and assign it
    // to instance property.
    const quotes = document.createElement('ul');
    this.quotes = quotes;

    // Create h1 element.
    const title = document.createElement('h1');

    // Create add button.
    const add = document.createElement('button');
    add.setAttribute(
      'style',
      `background-color: mediumseagreen;
      text-transform: uppercase;
      border-radius: 5px;
      width: 80%;
      font-family: 'Gloria Hallelujah', cursive;
      cursor: pointer;
      font-size: 18px;`
    );
    const text = document.createTextNode('Add');
    add.append(text);

    const container = document.createElement('div');
    container.setAttribute(
      'style',
      `display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
      justify-content: center;
      margin: 1rem;
      border: 2rem;
      border-color: black;
      box-shadow: 3px 4px 3px 4px black;
      padding: 2rem;
      max-width: 25rem;
      font-family: 'Gloria Hallelujah', cursive;`
    );
    // Append other elements to container
    // div.
    container.append(add, title, this.quotes);

    // Append div to shadow DOM.
    shadow.append(container);
  }

  connectedCallback() {
    // Get the dynamic name
    // and id attributes.
    const name = this.getAttribute('name');
    const id = this.getAttribute('id');

    // Update h1 with the name.
    const h1 = this.shadowRoot.querySelector('h1');
    h1.append(document.createTextNode(name));

    // Set ul id attribute to name.
    const quotes = this.shadowRoot.querySelector('ul');
    quotes.setAttribute('id', name);

    // Add event listener to
    // add button.
    const add = this.shadowRoot.querySelector('button');
    add.addEventListener('click', () => {
      fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      })
        .then((res) => res.json())
        .then(({ message, inserted: { id, content } }) => {
          this.quotes.append(
            createCustomElement('quotegen-quote', [
              ['quote', content],
              ['id', id],
            ])
          );
          displayServerMessage('added', message);
        });
    });
  }
}

export class Quote extends HTMLElement {
  constructor() {
    super();
    // Create shadow DOM.
    const shadow = this.attachShadow({ mode: 'open' });
    // Create list item.
    const listItem = document.createElement('li');
    listItem.setAttribute('style', `font-size: 18px;`);
    // Create delete button.
    const deleteButton = document.createElement('button');
    const deleteText = document.createTextNode('delete');
    deleteButton.append(deleteText);
    deleteButton.setAttribute(
      'style',
      `background-color: lightcoral; 
      border-radius: 10px; 
      margin-left: 15px; 
      cursor: pointer;
      width: 60px;
      font-family: Space Mono`
    );
    // Append delete button
    // to list item.
    listItem.append(deleteButton);
    // Append list item to shadow DOM.
    shadow.append(listItem);
  }

  connectedCallback() {
    // Get the dynamic quote and
    // id attributes.
    const quote = this.getAttribute('quote');
    const id = this.getAttribute('id');

    // Append quote text.
    const listItem = this.shadowRoot.querySelector('li');
    const quoteText = document.createTextNode(quote);
    listItem.append(quoteText);

    // Create and append
    // delete button.
    const deleteButton = this.shadowRoot.querySelector('button');
    deleteButton.addEventListener('click', () => {
      // Sync database.
      fetch(`${API_URL}/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      })
        .then((res) => res.json())
        .then(({ message }) => {
          // Remove quote from DOM.
          this.remove();
          displayServerMessage('deleted', message);
        });
    });
    listItem.append(deleteButton);
  }
}
