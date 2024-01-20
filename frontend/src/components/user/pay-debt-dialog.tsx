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

export function PayDebtDialog() {
  const debt = 29.12;
  const balance = 57.33;
  const [amount, setAmount] = useState(0.0);
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
            Deposit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
