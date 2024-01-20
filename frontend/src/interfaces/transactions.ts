import { Product } from "./product";

export interface Transaction {
  id: string;
  payer: string;
  signature: string;
  createdAt: any;
  status: "settled" | "unsettled" | "refunded";
  productId: string;
  product: Product;
}
