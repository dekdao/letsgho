import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAccount, useSignTypedData } from "wagmi";
import { config } from "@/constants/config";
import { letsgho_contract_address } from "@/app/wallet-wrapper";
import { Product } from "@/interfaces/product";
import { letsgho_abi } from "@/lib/contracts/letsgho-abi";
import { writeContract, prepareWriteContract } from "@wagmi/core";
import { gho_contract_address } from "./gho-pay-tab";
import { sepolia } from "wagmi";
import { secp256k1 } from "@noble/curves/secp256k1";
import { hexToNumber, numberToBytes, numberToHex } from "viem/utils";
import { LuCheck, LuRefreshCw } from "react-icons/lu";

export function AaveCreditPayTab({ product }: { product: Product }) {
  const [isPaying, setIsPaying] = useState(false);

  const [isPaid, setIsPaid] = useState(false);

  const { address } = useAccount();

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
    setIsPaying(false);
    setIsPaid(true);
  };

  // useEffect(() => {
  //   const pay = () => {
  //     const { r, s } = secp256k1.Signature.fromCompact(signature!.slice(2, 130));
  //     const v = hexToNumber(`0x${signature!.slice(130)}`);
  //     console.log("v", v);
  //     console.log("r", numberToHex(r));
  //     console.log("s", numberToHex(s));

  //     prepareWriteContract({
  //       abi: letsgho_abi,
  //       address: letsgho_contract_address,
  //       functionName: "settleWithDebt",
  //       args: [address, product.userAddress as `0x${string}`, price, deadline, v, numberToHex(r), numberToHex(s)]
  //     }).then((config) => {
  //       writeContract(config).then((v) => {
  //         setIsPaid(true);
  //       });
  //     });
  //     return Promise.resolve();
  //   };
  //   if (signature && !isPaid) {
  //     pay()
  //       .then(() => {
  //         setIsPaying(false);
  //         setIsPaid(true);
  //       })
  //       .catch(() => {
  //         setIsPaying(false);
  //       });
  //   }
  // }, [signature]);

  const mockData = {
    balance: 276.29
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
          <div className="flex  w-[100%] justify-start text-md">Your AAVE Borrowing Power</div>

          <RadioGroup defaultValue="option-one" className="flex w-[100%] items-center space-x-2">
            <div className="flex w-[100%] items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <div className="flex w-[100%] justify-between items-center">
                <h1 className="text-xl font-heading">{mockData.balance} $GHO</h1>
                <div className="flex flex-col justify-end">
                  <h1 className="text-lg font-heading text-end">Sepolia</h1>
                  <p className="text-sm text-end font-thin">Health Factor 0.8</p>
                </div>
              </div>
            </div>
          </RadioGroup>

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
