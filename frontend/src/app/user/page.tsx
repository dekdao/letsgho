import { DataPoint } from "@/components/common/data-point";
import HomeLayout from "@/components/layouts/home-layout";
import { HealthFactor } from "@/components/pay/health-factor";
import { Button } from "@/components/ui/button";
import { CollateralTable } from "@/components/user/collateral-table";
import { DepositDialog } from "@/components/user/deposit-dialog";
import { PayDebtDialog } from "@/components/user/pay-debt-dialog";
import { SettlementTable } from "@/components/user/settlement-table";
import { TransactionTable } from "@/components/user/transaction-table";
import { WithdrawFreeDialog } from "@/components/user/withdraw-free-dialog";
import { WithdrawNowDialog } from "@/components/user/withdraw-now-dialog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Let's GHO👻 Wallet"
};

export default function UserPage() {
  return (
    <HomeLayout>
      <div className="container flex flex-col pt-28 justify-center w-[100%] gap-10">
        <h1 className="text-2xl font-bold font-heading text-start w-[100%]">{"Let's GHO wallet"}</h1>

        <div className="grid grid-flow-col gap-4 w-[100%] ">
          <DataPoint topic="Collateral Balance" data="$ 2000" />
          <DataPoint topic="Available Credit" data="👻$ 1800" />
          <DataPoint topic="Total Debt" data="👻$ -100" />
          <DataPoint topic="Total Interest" data="👻$ 10" />
          <DataPoint topic="Health Factor" data="1.9" />
          <DataPoint topic="Killing Factor" data="1.2" />
        </div>

        <div className="grid grid-flow-col gap-4 w-[100%]">
          <DepositDialog />
          <PayDebtDialog />
          <WithdrawNowDialog />
          <WithdrawFreeDialog />
        </div>
        <div className="flex w-[100%] justify-center">
          <HealthFactor />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-heading text-start w-[100%] my-4">Credit Settlements</h1>
          <SettlementTable />
        </div>

        <div>
          <h1 className="text-2xl font-bold font-heading text-start w-[100%] my-4">Your Collaterals</h1>
          <CollateralTable />
        </div>

        <div>
          <h1 className="text-2xl font-bold font-heading text-start w-[100%] my-4">Transactions</h1>
          <TransactionTable />
        </div>
      </div>
    </HomeLayout>
  );
}
