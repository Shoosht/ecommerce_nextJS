import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {productId} = req.query;

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const productIdStr = Array.isArray(productId) ? productId[0] : productId;

    const product = await db
      .collection(`${process.env.DB_COLLECTION}`)
      .findOne({_id: new ObjectId(productIdStr) })

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

    res.json(product);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
};