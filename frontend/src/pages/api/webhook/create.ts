import admin from "@/lib/firebase-admin";
import type { NextApiResponse, NextApiRequest } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    userAddress: string;
    url: string;
    events: string[]; // "receive-payment" | "create-product" | "delete-product"
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const fs = admin.firestore();

  const { userAddress, url, events } = req.body;

  try {
    const webhookRef = fs.collection("webhooks").doc();
    const id = webhookRef.id;

    await webhookRef.set({
      userAddress,
      url,
      events
    });

    res.status(200).json({ id, message: "Success" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
