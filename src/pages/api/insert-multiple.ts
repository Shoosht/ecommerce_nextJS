import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { data } = req.body;

      if (data) {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        const dataArray = JSON.parse(data);

        if (Array.isArray(dataArray)) {
          const result = await db
            .collection(`${process.env.DB_COLLECTION}`)
            .insertMany(dataArray);

          res.status(201).json({
            message: 'Data inserted successfully',
            insertedCount: result.insertedCount,
          });
        } else {
          res.status(400).json({ error: 'Invalid JSON array format' });
        }
      } else {
        res.status(400).json({ error: 'Data is missing' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
};
