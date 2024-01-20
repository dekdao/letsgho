export interface Transaction {
  id: string;
  payer: string;
  receiver: string;
  amount: number;
  signature: string;
  productId: string;
  createdAt: any;
  status: "settled" | "unsettled" | "refunded";
}
