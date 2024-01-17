"use client";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { Button } from "../ui/button";

// Make sure that this component is wrapped with ConnectKitProvider
const MyComponent = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return <div>Connected Wallet: {address}</div>;
};
export function PaymentDetail() {
  const { address } = useAccount();

  return (
    <>
      <div className="flex justify-end">
        <ConnectKitButton />
      </div>
      {!address && <div className="flex h-[100%] items-center justify-center">Please connect your wallet</div>}
      {address && (
        <div className="my-[10%] flex flex-col gap-4 justify-center items-center">
          <p className="my-[10%] text-lg lg:text-2xl font-medium leading-none">Choose your payment type...</p>
          <Button className="w-[40%] py-8 bg-green-400">Let's GHO Wallet</Button>
          <Button className="w-[40%]">Pay with $GHO</Button>
          <Button className="w-[40%]">AAVE credit</Button>
        </div>
      )}
    </>
  );
}
