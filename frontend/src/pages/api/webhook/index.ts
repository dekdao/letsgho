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
    const webhookRef = fs.collection("webhooks").where("userAddress", "==", userAddress);
    const webhook = await webhookRef.get();

    const webhookDatas = webhook.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json({ message: "Success", data: webhookDatas });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default handler;
