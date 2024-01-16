// src: https://chakra-ui.com/getting-started/nextjs-guide
"use client";

import { config } from "@/constants/config";
import { UserProvider } from "@/hooks/use-user";
import { HandleOnComplete } from "@/lib/router-events";
import { ConnectKitProvider } from "connectkit";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { WagmiConfig } from "wagmi";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
        customTheme={{
          "--ck-font-family": "var(--font-geist-sans)"
        }}
      >
        <UserProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <HandleOnComplete />
            {children}
          </ThemeProvider>
        </UserProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
