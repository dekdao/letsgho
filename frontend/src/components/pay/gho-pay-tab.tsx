import { letsgho_contract_address } from "@/app/wallet-wrapper";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Product } from "@/interfaces/product";
import { erc20ABI, writeContract, prepareWriteContract, readContract } from "@wagmi/core";
import { useEffect, useState } from "react";
import { LuCheck } from "react-icons/lu";
import { sepolia, useAccount, useSignTypedData } from "wagmi";
import axios from "axios";
export const gho_contract_address = "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60";

interface GhoPayTabProps {
  product: Product;
}
export function GhoPayTab({ product }: GhoPayTabProps) {
  const { address } = useAccount();
  const [balance, setBalance] = useState<bigint>();
  const [isPaid, setIsPaid] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  useEffect(() => {
    const fetchBalance = async () => {
      const result = await readContract({
        abi: erc20ABI,
        address: gho_contract_address,
        functionName: "balanceOf",
        args: [address as `0x${string}`]
      });

      setBalance(result);
    };
    if (address) {
      fetchBalance();
    }
  }, [address]);

  const deadline = Math.floor(Date.now() / 1e3) + 600;
  const price = BigInt(product.price * 1e18);

  // set the domain parameters
  const domain = {
    name: "GHO",
    version: "1",
    chainId: sepolia.id,
    verifyingContract: gho_contract_address as `0x${string}`
  };

  // set the Permit type parameters
  const types = {
    Permit: [
      {
        name: "owner",
        type: "address"
      },
      {
        name: "spender",
        type: "address"
      },
      {
        name: "value",
        type: "uint256"
      },
      {
        name: "nonce",
        type: "uint256"
      },
      {
        name: "deadline",
        type: "uint256"
      }
    ]
  };

  // set the Permit type values
  const message = {
    owner: address,
    spender: letsgho_contract_address,
    value: price,
    nonce: 69,
    deadline
  };

  const {
    data: signature,
    variables,
    signTypedData,
    reset
  } = useSignTypedData({
    domain,
    message,
    primaryType: "Permit",
    types
  });

  const sign = () => {
    setIsPaying(true);
    signTypedData();
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
          <div className="flex  w-[100%] justify-start text-md">Your $GHO Balances</div>

          <RadioGroup defaultValue="option-one" className="flex w-[100%] items-center space-x-2">
            <div className="flex w-[100%] items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <div className="flex w-[100%] justify-between items-center">
                <h1 className="text-xl font-heading">{balance ? Number(balance / BigInt(1e16)) / 100 : 0} $GHO</h1>
                <h1 className="text-lg font-heading">Sepolia</h1>
              </div>
            </div>
          </RadioGroup>

          <Button
            disabled={!balance || balance <= BigInt(product.price * 1e18)}
            className="w-[100%] bg-green-400 dark:bg-green-400"
            onClick={sign}
          >
            Pay Now
          </Button>
        </div>
      )}
    </>
  );
}
