import admin from "@/lib/firebase-admin";
import type { NextApiResponse, NextApiRequest } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    webhookId: string;
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const fs = admin.firestore();

  const { webhookId } = req.body;

  try {
    const webhookRef = fs.collection("webhooks").doc(webhookId);
    const webhookData = await webhookRef.get();
    if (!webhookData.exists) {
      res.status(404).json({ error: "Webhook not found" });
      return;
    }

    await webhookRef.delete();

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
