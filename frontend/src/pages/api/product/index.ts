import admin from "@/lib/firebase-admin";
import { NextApiRequestWithUser, firebaseAuth } from "@/middlewares/auth";
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

    const productDatas = product.docs.map((doc) => doc.data());

    res.status(200).json({ message: "Success", data: productDatas });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default firebaseAuth(handler);
