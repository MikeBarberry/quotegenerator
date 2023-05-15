export function checkIfLastQuote(show) {
  if (
    show.node.children.length === 1 &&
    ['Community', 'Game of Thrones', 'Hey Arnold', 'South Park'].includes(
      show.name
    )
  ) {
    const lastQuote = show.node.children[0];
    lastQuote.removeChild(lastQuote.children[0]);
  }
}

export function createElement(type, options) {
  const element = document.createElement(type);
  Object.assign(element, options);
  return element;
}
