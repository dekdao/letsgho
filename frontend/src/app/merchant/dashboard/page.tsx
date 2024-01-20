"use client";

import { MockChart } from "@/components/common/mock-chart";
import HomeLayout from "@/components/layouts/home-layout";
import { CreateProductDialog } from "@/components/merchant/create-product-dialog";
import { MerchantTxTable } from "@/components/merchant/merchant-tx-table";
import { ProductTable } from "@/components/merchant/product-table";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { BASE_DENOM } from "@/constants/denom";
import { Product } from "@/interfaces/product";
import { Transaction } from "@/interfaces/transactions";
import { cn } from "@/lib/utils";
import axios from "axios";
import { ConnectKitButton } from "connectkit";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected, address } = useAccount();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (address) {
      axios
        .post("/api/product", {
          userAddress: address
        })
        .then((res) => {
          setProducts(res.data.data);
        });
      axios
        .post("/api/transaction", {
          userAddress: address
        })
        .then((res) => {
          setTransactions(res.data.data.receiver);
        });
    } else {
      router.push("/merchant");
    }
  }, [address]);

  const fetchAndAddProduct = async (id: string) => {
    const res = await axios.get(`/api/product/${id}`);
    const product = res.data.data;
    setProducts((products) => [...products, product]);
  };

  return (
    <HomeLayout hideNav>
      {isConnected && (
        <div className="container flex flex-col pt-12 justify-center w-[100%] gap-10">
          <div className="flex flex-col md:flex-row justify-between gap-2 items-center">
            <h1 className="font-bold font-heading text-2xl sm:text-3xl md:text-4xl">{address?.slice(0, 16)} Store</h1>
            <ConnectKitButton showBalance />
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-row gap-12">
                {[
                  ["Gross Volume", 12000, "+12"],
                  ["Yesterday", 2600, "-5"],
                  ["Today", 3000]
                ].map((item, i) => (
                  <div className="flex flex-col w-fit" key={i}>
                    <text className="flex items-center gap-2 text-muted-foreground">
                      {item[0]} {item[2] && <Badge>{item[2]}%</Badge>}
                    </text>
                    <text className="font-semibold text-3xl">
                      <span className="text-base">{BASE_DENOM}</span>
                      {item[1]}
                    </text>
                  </div>
                ))}
              </div>
              <MockChart />
            </div>
            <div className="flex flex-col gap-4 w-[25%] min-w-[200px]">
              <text className="text-3xl font-bold">Payouts</text>
              <div className="flex flex-col gap-4">
                {[
                  [
                    `${BASE_DENOM} Balance`,
                    12500,
                    "Available To Payout",
                    "text-muted-foreground",
                    <Button size="sm" variant="outline" className="mt-2">
                      Claim
                    </Button>
                  ],
                  [`${BASE_DENOM} Pending`, 3000, "Payout in 28 days", "text-destructive"]
                ].map((item, i) => (
                  <div className="flex flex-col w-fit" key={i}>
                    <text className="flex items-center gap-2 text-muted-foreground">{item[0]}</text>
                    <text className="font-semibold text-3xl">{item[1]}</text>
                    <text className={cn(`text-sm font-semibold`, item[3])}>{item[2]}</text>
                    {item[4]}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-2xl font-bold font-heading text-start w-[100%] my-4">Products</h1>
              <CreateProductDialog onSuccess={fetchAndAddProduct}>
                <DialogTrigger className={`${buttonVariants({ size: "sm" })}`}>Create Product</DialogTrigger>
              </CreateProductDialog>
            </div>
            <ProductTable products={products} />
          </div>

          <div>
            <h1 className="text-2xl font-bold font-heading text-start w-[100%] my-4">Transaction</h1>
            <MerchantTxTable txs={transactions} />
          </div>
        </div>
      )}
    </HomeLayout>
  );
}
