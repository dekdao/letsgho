"use client";

import { MockChart } from "@/components/common/mock-chart";
import HomeLayout from "@/components/layouts/home-layout";
import { CreateProductDialog } from "@/components/merchant/create-product-dialog";
import { MerchantTxTable } from "@/components/merchant/merchant-tx-table";
import { ProductTable } from "@/components/merchant/product-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Product } from "@/interfaces/product";
import { Transaction } from "@/interfaces/transactions";
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
          <MockChart />
          <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
            {[
              ["Gross Volume ($GHO)", 2000],
              ["Last Period ($GHO)", 1000],
              ["Current Period ($GHO)", 1000]
            ].map((v, i) => (
              <div key={i} className="flex flex-col w-fit">
                <text className="font-bold text-2xl">{v[0]}</text>
                <text className="text-xl">{v[1]}</text>
              </div>
            ))}
            <Button>Settle</Button>
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
