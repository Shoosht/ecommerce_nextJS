import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { image_link, title, description, price, category, subcategory  } = req.body;

      if (image_link && title && description && price && category && subcategory ) {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        const result = await db.collection(`${process.env.DB_COLLECTION}`).insertOne({
          image_link,
          title, 
          description, 
          price, 
          category, 
          subcategory 
          
        });

        res.status(201).json({ message: 'Data inserted successfully', result });
      } else {
        res.status(400).json({ error: 'Incomplete data' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
};