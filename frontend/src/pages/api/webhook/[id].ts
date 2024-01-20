import admin from "@/lib/firebase-admin";
import { NextApiRequestWithUser } from "@/middlewares/auth";
import type { NextApiResponse } from "next";

async function handler(req: NextApiRequestWithUser, res: NextApiResponse) {
  const fs = admin.firestore();

  const { id } = req.query as { id: string };

  try {
    const webhookRef = fs.collection("webhooks").doc(id);
    const webhook = await webhookRef.get();

    if (!webhook.exists) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    const webhookData = webhook.data();
    res.status(200).json({
      message: "Success",
      data: {
        id: webhook.id,
        ...webhookData
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default handler;
