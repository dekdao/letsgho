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

export function WithdrawNowDialog() {
  const [chain, setChain] = useState<string | undefined>();
  const [asset, setAsset] = useState<string | undefined>();
  const [amount, setAmount] = useState(0.0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Pay and withdraw NOW 💯</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Withdraw NOW 💯</DialogTitle>
          <DialogDescription>Withdraw collateral from your Let's GHO👻 Wallet NOW</DialogDescription>
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
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
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
              onChange={(v) => setAmount(parseFloat(v.target.value))}
              className=" col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              //TODO
            }}
          >
            Withdraw NOW 💯
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
