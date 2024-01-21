"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import { useAccount } from "wagmi";
import useUser from "@/hooks/use-user";

export function PayDebtDialog() {
  const [debt, setDebt] = useState(0.0);
  const [balance, setBalance] = useState(0.0);
  const [amount, setAmount] = useState(0.0);

  const { address } = useAccount();
  const { ghoWalletAddress } = useUser();

  useEffect(() => {
    if (ghoWalletAddress) {
      readContract({
        abi: [
          {
            inputs: [
              {
                internalType: "address",
                name: "",
                type: "address"
              }
            ],
            name: "balanceOf",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256"
              }
            ],
            stateMutability: "view",
            type: "function"
          }
        ],
        address: "0x67ae46EF043F7A4508BD1d6B94DB6c33F0915844",
        functionName: "balanceOf",
        args: [ghoWalletAddress]
      }).then((v: any) => {
        setDebt(parseFloat(v.toString()) / 10 ** 18);
      });
      readContract({
        abi: [
          {
            inputs: [
              {
                internalType: "address",
                name: "",
                type: "address"
              }
            ],
            name: "balanceOf",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256"
              }
            ],
            stateMutability: "view",
            type: "function"
          }
        ],
        address: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
        functionName: "balanceOf",
        args: [ghoWalletAddress]
      }).then((v: any) => {
        setBalance(parseFloat(v.toString()) / 10 ** 18);
      });
    }
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Pay Debt</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pay Debt</DialogTitle>
          <DialogDescription>Make a repayment</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <h1 className="text-right">Your Debt</h1>
            <p className="col-span-3">{debt} $👻</p>
          </div>

          <div className="grid grid-cols-4 gap-4 items-center mt-4 ">
            <h1 className="text-right">Amount</h1>
            <Input
              type="number"
              id="amount"
              value={amount}
              onChange={(v) => setAmount(parseFloat(v.target.value))}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 gap-4 items-center ">
            <div />
            <div className="col-span-2 ">
              <p
                className="text-left text-xs underline cursor-pointer text-blue-400"
                onClick={() => {
                  setAmount(debt);
                }}
              >
                Pay max
              </p>
            </div>
            <div>
              <p className="text-right text-xs font-semibold ">Balance: {balance} $👻</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              //TODO
            }}
          >
            Pay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
