import { Product } from "@/interfaces/product";
import admin from "@/lib/firebase-admin";
import type { NextApiResponse, NextApiRequest } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    payerAddress: string;
    productId: string;
    signature: string;
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const fs = admin.firestore();

  const { payerAddress, signature, productId } = req.body;

  try {
    const transactionRef = fs.collection("transactions").doc();
    const productRef = await fs.collection("products").doc(productId).get();

    if (!productRef.exists) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    const productData = {
      id: productRef.id,
      ...productRef.data()
    } as Product;
    await transactionRef.set({
      payer: payerAddress,
      signature,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: "unsettled",
      product: productData
    });

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
