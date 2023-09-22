import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; 

export default async function handler(req, res) {
  const snapshot = await getDocs(collection(db, "carts"));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  res.status(200).json(data);
}
