import admin from "@/lib/firebase-admin";
import { uploadBase64 } from "@/lib/firebase-storage";
import type { NextApiResponse, NextApiRequest } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    userAddress: string;
    image: string; // base64
    name: string;
    description: string;
    price: number; // usd
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const fs = admin.firestore();

  const { userAddress, image, name, description, price } = req.body;

  try {
    const productRef = fs.collection("products").doc();
    const id = productRef.id;

    const productImagePath = `product-images/${id}.jpg`;
    const imageUrl = await uploadBase64(image, productImagePath);

    await productRef.set({
      name,
      description,
      price,
      imageUrl,
      userAddress
    });

    res.status(200).json({ id, message: "Success" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
