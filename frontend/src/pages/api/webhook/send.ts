import admin from "@/lib/firebase-admin";
import axios from "axios";

export async function sendWebhook(userAddress: string, event: string, metadata: any) {
  try {
    const fs = admin.firestore();
    const webhookRef = fs
      .collection("webhooks")
      .where("userAddress", "==", userAddress)
      .where("events", "array-contains", event);
    const webhooks = await webhookRef.get();
    webhooks.docs.forEach((w) => {
      try {
        const webhook = w.data();
        axios.post(webhook.url, {
          event,
          metadata
        });
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
}
