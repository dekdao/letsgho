import { LuCheck, LuRefreshCw } from "react-icons/lu";
import { Button } from "../ui/button";
import { HealthFactor } from "./health-factor";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/interfaces/product";
import { useAccount, useSignMessage } from "wagmi";

export function LetsGhoPayTab({ product }: { product: Product }) {
  const [isPaying, setIsPaying] = useState(false);

  const [isPaid, setIsPaid] = useState(false);

  const { address } = useAccount();
  const { signMessage, isLoading, data: signature } = useSignMessage();

  const sign = () => {
    setIsPaying(true);
    signMessage({
      message: `
      address: ${address}
      product: ${product.name}
      price: ${product.price}
      id: ${product.id}
      timestamp: ${Date.now()}
      chain: sepolia
      `
    });
    setIsPaying(false);
  };

  useEffect(() => {
    if (signature && !isPaid) {
      axios
        .post("/api/transaction/pay", {
          payerAddress: address,
          productId: product.id,
          signature
        })
        .then(() => {
          setIsPaying(false);
          setIsPaid(true);
        })
        .catch(() => {
          setIsPaying(false);
        });
    }
  }, [signature, isPaid, address, product?.id]);

  const mockData = {
    credit: 2521.67,
    healthFactor: 1.2
  };
  return (
    <>
      {isPaid && (
        <div className="flex flex-col h-[100%] w-[100%] items-center justify-center gap-16 m-8">
          <LuCheck className=" w-[30%] h-[30%] text-green-400 p-4 rounded-full border-green-400 border-2" />
          <h1 className="text-xl font-heading">Payment Successful</h1>
        </div>
      )}
      {!isPaid && (
        <div className="flex flex-col gap-4 items-center w-[100%]">
          <div className="flex  w-[100%] justify-start text-md">Your Let{"'"}s GHO Credit</div>
          <h1 className="text-4xl font-heading">${mockData.credit}</h1>
          <div className="flex flex-col items-center">
            <div className="text-md">Credit Health Factor</div>
            <h1 className="text-xl text-green-400 font-heading">{mockData.healthFactor}</h1>
            <h1 className="text-2xl font-heading">🤑</h1>
          </div>
          <HealthFactor />

          <Button className="w-[100%] bg-green-400 dark:bg-green-400" onClick={sign} disabled={isPaying}>
            {isPaying && (
              <>
                <LuRefreshCw className="mr-2 h-4 w-4 animate-spin" />{" "}
              </>
            )}
            {"Pay Now"}
          </Button>
        </div>
      )}
    </>
  );
}
