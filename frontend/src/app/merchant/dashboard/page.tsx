"use client";

import HomeLayout from "@/components/layouts/home-layout";
import { CreateProductDialog } from "@/components/merchant/create-product-dialog";
import { ProductTable } from "@/components/merchant/product-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Product } from "@/interfaces/product";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { ConnectKitButton } from "connectkit";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected, address } = useAccount();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (address) {
      axios
        .post("/api/product", {
          userAddress: address
        })
        .then((res) => {
          setProducts(res.data.data);
        });
    } else {
      router.push("/merchant");
    }
  }, [address]);

  return (
    <HomeLayout hideNav>
      {isConnected && (
        <div className="container flex flex-col pt-12 justify-center w-[100%] gap-10">
          <div className="flex flex-col md:flex-row justify-between gap-2 items-center">
            <h1 className="font-bold font-heading text-2xl sm:text-3xl md:text-4xl">{address?.slice(0, 16)} Store</h1>
            <ConnectKitButton showBalance />
          </div>
          <div>
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-2xl font-bold font-heading text-start w-[100%] my-4">Products</h1>
              <CreateProductDialog onSuccess={(id) => {}}>
                <DialogTrigger className={`${buttonVariants({ size: "sm" })}`}>Create Product</DialogTrigger>
              </CreateProductDialog>
            </div>
            <ProductTable products={products} />
          </div>
        </div>
      )}
    </HomeLayout>
  );
}
