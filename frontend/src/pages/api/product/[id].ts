import admin from "@/lib/firebase-admin";
import { NextApiRequestWithUser } from "@/middlewares/auth";
import type { NextApiResponse } from "next";

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  const fs = admin.firestore();

  const { id } = req.query as { id: string };

  try {
    const productRef = fs.collection("products").doc(id);
    const product = await productRef.get();

    if (!product.exists) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    const productData = product.data();
    res.status(200).json({ message: "Success", data: productData });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default handler;
