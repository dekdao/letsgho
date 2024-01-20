"use client";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { Button } from "../ui/button";
import { useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import { LoadingSpinner } from "../ui/loading-spinner";
import { LetsGhoPayTab } from "./letsgho-pay-tab";
import { GhoPayTab } from "./gho-pay-tab";
import { AaveCreditPayTab } from "./aave-credit-pay-tab";
import ChangeThemeButton from "../layouts/change-theme-button";

export function PaymentDetail() {
  const { address, isConnecting, isReconnecting } = useAccount();
  const [mode, setMode] = useState<"default" | "letsgho" | "gho" | "aave">("default");

  return (
    <div className="h-[100%]">
      <div className="flex justify-end gap-4">
        <ChangeThemeButton />
        <ConnectKitButton />
      </div>
      {!address && (isConnecting || isReconnecting) && (
        <div className="flex h-[100%] items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      {!address && !(isConnecting || isReconnecting) && (
        <div className="flex h-[100%] items-center justify-center">Please connect your wallet</div>
      )}
      {address && (
        <div className="my-[10%] flex flex-col gap-4 justify-center items-center">
          {mode === "default" && (
            <>
              <div className="flex items-center justify-center w-full relative">
                <p className="text-lg my-[30px] lg:text-xl font-medium leading-none text-center">
                  Choose your payment type...
                </p>
              </div>
              <Button className="w-[50%] py-8 bg-green-400" onClick={() => setMode("letsgho")}>
                {"Let's GHO Wallet"}
              </Button>
              <Button className="w-[50%]" onClick={() => setMode("gho")}>
                Pay with $GHO
              </Button>
              <Button className="w-[50%]" onClick={() => setMode("aave")}>
                AAVE credit
              </Button>
            </>
          )}

          {mode === "letsgho" && (
            <>
              <div className="flex items-center justify-center w-full relative">
                <LuArrowLeft
                  className="absolute w-[20px] h-[20px] bg-transparent black left-0"
                  onClick={() => {
                    setMode("default");
                  }}
                />

                <p className="text-lg my-[30px] lg:text-xl font-medium leading-none text-center">
                  {"Let's GHO Wallet"}
                </p>
              </div>
              <LetsGhoPayTab />
            </>
          )}

          {mode === "gho" && (
            <>
              <div className="flex items-center justify-center w-full relative">
                <LuArrowLeft
                  className="absolute w-[20px] h-[20px] bg-transparent black left-0"
                  onClick={() => {
                    setMode("default");
                  }}
                />

                <p className="text-lg my-[30px] lg:text-xl font-medium leading-none text-center">Pay with $GHO</p>
              </div>
              <GhoPayTab />
            </>
          )}

          {mode === "aave" && (
            <>
              <div className="flex items-center justify-center w-full relative">
                <LuArrowLeft
                  className="absolute w-[20px] h-[20px] bg-transparent black left-0"
                  onClick={() => {
                    setMode("default");
                  }}
                />

                <p className="text-lg my-[30px] lg:text-xl font-medium leading-none text-center">AAVE credit</p>
              </div>
              <AaveCreditPayTab />
            </>
          )}
        </div>
      )}
    </div>
  );
}
