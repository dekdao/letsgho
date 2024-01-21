import { letsgho_abi } from "@/lib/contracts/letsgho-abi";
import { useEffect } from "react";
import { readContract } from "@wagmi/core";
import { useAccount, useContractWrite } from "wagmi";
import useUser from "@/hooks/use-user";

export const letsgho_contract_address = "0xc2cf290dcc84f73e849f9309bb746f9d302920ca";

export const WalletWrapper = ({ children }: { children: React.ReactNode }) => {
  const { address } = useAccount();
  const { write } = useContractWrite({
    address: letsgho_contract_address,
    abi: letsgho_abi,
    functionName: "newWallet"
  });
  const { setGhoWalletAddress } = useUser();

  useEffect(() => {
    if (address) {
      readContract({
        abi: letsgho_abi,
        address: letsgho_contract_address,
        functionName: "ghoWallets",
        args: [address]
      }).then((v) => {
        if (v === "0x0000000000000000000000000000000000000000") {
          write();
        } else {
          setGhoWalletAddress(v as string);
        }
      });
    }
  }, [address, setGhoWalletAddress, write]);

  return <>{children}</>;
};
