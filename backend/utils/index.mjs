export function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      'access-control-allow-origin': '*',
    },
    body: JSON.stringify(body),
  };
}

export function getQuoteFromShow(showId, dbObject) {
  const showQuotes = dbObject[showId];
  const index = Math.floor(Math.random() * showQuotes.length);
  return showQuotes[index];
}
