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
    const payerTransactionRef = fs.collection("transactions").where("payer", "==", userAddress);
    const payerTransaction = await payerTransactionRef.get();
    const payerTransactionDatas = payerTransaction.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    const receiverTransactionRef = fs.collection("transactions").where("receiver", "==", userAddress);
    const receiverTransaction = await receiverTransactionRef.get();
    const receiverTransactionDatas = receiverTransaction.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json({
      message: "Success",
      data: {
        payer: payerTransactionDatas,
        receiver: receiverTransactionDatas
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default handler;
