import fs from 'node:fs/promises';
import path from 'node:path';
import { ObjectId } from 'mongodb';
import { response, getQuoteFromShow } from '../utils/index.mjs';

export default async function addQuote({ quotesCol, body }) {
  const { id: showId } = body;

  const filePath = path.join('/var/task', '/db/quotesDB.json');
  const quotesDB = await fs.readFile(filePath, 'utf-8');
  const jsQuotesDB = JSON.parse(quotesDB);

  const quoteToAdd = getQuoteFromShow(showId, jsQuotesDB);

  try {
    const insertedQuote = await quotesCol.insertOne({
      quote: quoteToAdd,
      show_id: new ObjectId(showId),
    });

    return response(200, {
      message: 'Quote Successfully Created!',
      inserted: {
        id: insertedQuote.insertedId.toString(),
        content: quoteToAdd,
        showId,
      },
    });
  } catch (err) {
    console.log(`Error adding quote: ${err}`);
    return response(500, {
      message: 'Internal Server Error',
    });
  }
}
