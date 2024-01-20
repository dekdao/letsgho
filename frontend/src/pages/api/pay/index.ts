import admin from "@/lib/firebase-admin";
import type { NextApiResponse, NextApiRequest } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    payer: string;
    receiver: string;
    amount: number; // usd
    signature: string;
    productId: string;
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const fs = admin.firestore();

  const { payer, receiver, amount, signature, productId } = req.body;

  try {
    const transactionRef = fs.collection("transactions").doc();

    await transactionRef.set({
      payer,
      receiver,
      amount,
      signature,
      productId
    });

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
