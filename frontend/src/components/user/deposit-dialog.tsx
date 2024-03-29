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
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import useUser from "@/hooks/use-user";
import { useContractWrite } from "wagmi";
import { letsgho_wallet_abi } from "@/lib/contracts/letsgho-wallet-abi";

export function DepositDialog() {
  const [chain, setChain] = useState<string | undefined>();
  const [asset, setAsset] = useState<string | undefined>();
  const [amount, setAmount] = useState(0.0);
  const { ghoWalletAddress } = useUser();

  const { write } = useContractWrite({
    address: ghoWalletAddress as `0x${string}`,
    abi: letsgho_wallet_abi,
    functionName: "deposit",
    args: [asset, BigInt((amount || 0) * 10 ** 18)]
  });

  const { write: approve } = useContractWrite({
    address: asset as `0x${string}`,
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          }
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool"
          }
        ],
        stateMutability: "nonpayable",
        type: "function"
      }
    ],
    functionName: "approve",
    args: [ghoWalletAddress, BigInt((amount || 0) * 10 ** 18)]
  });

  const onApprove = () => {
    if (!ghoWalletAddress) return;
    approve();
  };

  const onDeposit = () => {
    if (!ghoWalletAddress) return;
    write();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Deposit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deposit</DialogTitle>
          <DialogDescription>
            Make a deposit with your preferred currency into your Let{"'"}s GHO👻 Wallet
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <h1 className="text-right">Chain</h1>
            <div className="col-span-3">
              <Select
                value={chain}
                onValueChange={(v) => {
                  setChain(v);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sepolia">Sepolia ETH</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <h1 className="text-right">Asset</h1>
            <div className="col-span-3">
              <Select
                value={asset}
                onValueChange={(v) => {
                  setAsset(v);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c">WETH</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4 ">
            <h1 className="text-right">Amount</h1>
            <Input
              type="number"
              id="amount"
              value={amount}
              onChange={(v) => setAmount(parseFloat(v.target.value ?? 0))}
              className=" col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onApprove} disabled={!asset || !amount}>
            Approve
          </Button>
          <Button onClick={onDeposit} disabled={!asset || !amount}>
            Deposit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
