import type { Metadata } from "next";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import GoogleAnalytics from "./GoogleAnalytics";
import Hotjar from "./Hotjar";

import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "letsgho.xyz",
  description: "Web3 Stripe"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", GeistSans.variable)}>
        {process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID} />
        ) : null}
        {process.env.NEXT_PUBLIC_HOTJAR_ID ? <Hotjar hjid={process.env.NEXT_PUBLIC_HOTJAR_ID} /> : null}
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
