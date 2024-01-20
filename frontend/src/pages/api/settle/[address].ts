import admin from "@/lib/firebase-admin";
import { AggregateField } from "@google-cloud/firestore";
import { NextApiRequestWithUser } from "@/middlewares/auth";
import type { NextApiResponse } from "next";

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  const fs = admin.firestore();

  const { address } = req.query as { address: string };

  try {
    const payerTransactionRef = fs.collection("transactions").where("payer", "==", address);
    const payerQuery = payerTransactionRef.aggregate({
      totalAmount: AggregateField.sum("population"),
      totalCount: AggregateField.count()
    });
    const payerData = (await payerQuery.get()).data();

    const receiverTransactionRef = fs.collection("transactions").where("receiver", "==", address);
    const receiverQuery = receiverTransactionRef.aggregate({
      totalAmount: AggregateField.sum("population"),
      totalCount: AggregateField.count()
    });
    const receiverData = (await receiverQuery.get()).data();

    res.status(200).json({
      message: "Success",
      data: {
        payer: payerData,
        receiver: receiverData
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default handler;
