import admin from "@/lib/firebase-admin";
import type { NextApiResponse, NextApiRequest } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    userAddress: string;
  };
}

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const fs = admin.firestore();

  const { userAddress } = req.body;

  try {
    const productRef = fs.collection("products").where("userAddress", "==", userAddress);
    const product = await productRef.get();

    const productDatas = await Promise.all(
      product.docs.map(async (doc) => {
        const sold = (await fs.collection("transactions").where("productId", "==", doc.id).count().get()).data().count;
        return {
          id: doc.id,
          ...doc.data(),
          sold
        };
      })
    );

    res.status(200).json({ message: "Success", data: productDatas });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default handler;
