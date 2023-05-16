import { response } from '../utils/index.mjs';

export default async function getContent({ showsCol }) {
  try {
    const showQuotes = await showsCol
      .aggregate([
        {
          $lookup: {
            from: 'quotes',
            let: { id: '$_id' },
            pipeline: [
              {
                $match: { $expr: { $eq: ['$$id', '$show_id'] } },
              },
              {
                $project: {
                  _id: 0,
                  id: {
                    $toString: '$_id',
                  },
                  content: '$quote',
                },
              },
            ],
            as: 'showQuotes',
          },
        },
        {
          $project: {
            _id: 0,
            showId: { $toString: '$_id' },
            showQuotes: 1,
            name: 1,
          },
        },
        { $sort: { name: 1 } },
      ])
      .toArray();

    return response(200, showQuotes);
  } catch (err) {
    console.log(`Error getting content: ${err}`);
    return response(500, { message: 'Internal Server Error' });
  }
}
