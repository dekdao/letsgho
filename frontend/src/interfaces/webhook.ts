export enum WebhookEvents {
  RECEIVE_PAYMENT = "receive-payment",
  CREATE_PRODUCT = "create-product",
  DELETE_PRODUCT = "delete-product"
}

export interface Webhook {
  id: string;
  userAddress: string;
  url: string;
  events: WebhookEvents[]; // "receive-payment" | "create-product" | "delete-product"
}
