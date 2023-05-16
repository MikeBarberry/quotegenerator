import { ObjectId } from 'mongodb';
import { response } from '../utils/index.mjs';

export default async function deleteQuote({ quotesCol, body }) {
  const { id } = body;

  try {
    const quoteToDelete = await quotesCol.findOne({ _id: new ObjectId(id) });
    await quotesCol.deleteOne({ _id: new ObjectId(id) });

    const deleted = {
      id: quoteToDelete._id.toString(),
      content: quoteToDelete.quote,
      showId: quoteToDelete.show_id.toString(),
    };

    return response(200, { message: 'Quote Successfully Deleted!', deleted });
  } catch (err) {
    console.log(`Error deleting quote: ${err}`);
    return response(500, { message: 'Internal Server Error' });
  }
}
