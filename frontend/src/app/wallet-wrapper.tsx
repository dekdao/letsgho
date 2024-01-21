import { letsgho_abi } from "@/lib/contracts/letsgho-abi";
import { useEffect } from "react";
import { readContract } from "@wagmi/core";
import { useAccount, useContractWrite } from "wagmi";

export const WalletWrapper = ({ children }: { children: React.ReactNode }) => {
  const { address } = useAccount();
  const { write } = useContractWrite({
    address: "0xc2cf290dcc84f73e849f9309bb746f9d302920ca",
    abi: letsgho_abi,
    functionName: "newWallet"
  });

  useEffect(() => {
    if (address) {
      readContract({
        abi: letsgho_abi,
        address: "0xc2cf290dcc84f73e849f9309bb746f9d302920ca",
        functionName: "ghoWallets",
        args: [address]
      }).then((v) => {
        if (v === "0x0000000000000000000000000000000000000000") {
          write();
        }
      });
    }
  }, [address, write]);

  return <>{children}</>;
};
