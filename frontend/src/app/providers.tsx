// src: https://chakra-ui.com/getting-started/nextjs-guide
"use client";
import { config } from "@/constants/config";
import { UserProvider } from "@/hooks/use-user";
import { HandleOnComplete } from "@/lib/router-events";
import { ConnectKitProvider } from "connectkit";
import { ThemeProvider } from "next-themes";
import { WagmiConfig } from "wagmi";
import { WalletWrapper } from "./wallet-wrapper";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
        mode="auto"
        customTheme={{
          "--ck-font-family": "var(--font-geist-sans)"
        }}
      >
        <UserProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <HandleOnComplete />
            <WalletWrapper>{children}</WalletWrapper>
          </ThemeProvider>
        </UserProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
