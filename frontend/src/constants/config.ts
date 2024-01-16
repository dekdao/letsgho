"use client";

import { getDefaultConfig } from "connectkit";
import { configureChains, createConfig, sepolia } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains([sepolia], [publicProvider()]);

export const config = createConfig(
  getDefaultConfig({
    chains,
    publicClient,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || "",
    appName: "LetsGHO",
    appDescription: "Why not GHO?",
    appUrl: process.env.NEXT_PUBLIC_ORIGIN_URL // your app's url
  })
);
