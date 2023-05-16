import { MongoClient } from 'mongodb';
import { addQuote, deleteQuote, getContent } from './routes/index.mjs';
import { response } from './utils/index.mjs';

const client = new MongoClient(process.env.MONGO_URI);

export async function handler(event) {
  const ROUTING_ERROR_MESSAGE = 'Unknown request method/path combination';
  const ROUTING_ERROR = response(400, ROUTING_ERROR_MESSAGE);
  const db = client.db('quotegen');

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'access-control-allow-headers':
          'content-type,x-amz-date,authorization,x-api-key,x-amz-security-token,origin,accept',
        'access-control-allow-methods': 'options,post,get,put,delete',
        'access-control-allow-origin': '*',
      },
    };
  } else if (event.httpMethod === 'GET') {
    if (event.path === '/') {
      return getContent({ showsCol: db.collection('shows') });
    }
    return ROUTING_ERROR;
  } else if (event.httpMethod === 'POST') {
    const args = {
      quotesCol: db.collection('quotes'),
      body: JSON.parse(event.body),
    };

    switch (event.path) {
      case '/add': {
        return addQuote(args);
      }
      case '/delete': {
        return deleteQuote(args);
      }
      default: {
        return ROUTING_ERROR;
      }
    }
  }
}
