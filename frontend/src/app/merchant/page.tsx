"use client";

import ChangeThemeButton from "@/components/layouts/change-theme-button";
import HomeLayout from "@/components/layouts/home-layout";
import { buttonVariants } from "@/components/ui/button";
import { TypographyH1, TypographyH2, TypographyH3, TypographyH4, TypographySmall } from "@/components/ui/typography";
import { Link } from "@/lib/router-events";
import { cn } from "@/lib/utils";
import { ConnectKitButton } from "connectkit";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LuCircleSlash2, LuCreditCard, LuDollarSign, LuLink, LuPiggyBank, LuRefreshCw, LuRocket } from "react-icons/lu";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push("/merchant/dashboard");
    }
  }, [isConnected]);

  return (
    <HomeLayout hideNav>
      <section className="space-y-6 pb-8 pt-28 lg:py-32 h-full">
        <div className="container flex max-w-[64rem] flex-col gap-4">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">Let's GHO Merchant</h1>

          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {[
              [<LuDollarSign />, "Gasless Payment"],
              [<LuCreditCard />, "Credit-Debit Support"],
              [<LuCircleSlash2 />, "Zero Fees And Zero Interest Period"]
            ].map((e, i) => (
              <p
                key={i}
                className="leading-normal text-muted-foreground base:text-sm sm:text-lg :leading-8 border-2 px-6 py-2 rounded-full w-fit flex items-center gap-2"
              >
                {e[0]} {e[1]}
              </p>
            ))}
          </div>
          <div className="space-x-4">
            <ConnectKitButton.Custom>
              {({ isConnecting, show }) => (
                <button disabled={isConnecting} className={cn(buttonVariants({ size: "lg" }))} onClick={show}>
                  {isConnecting ? (
                    <>
                      <LuRefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Connecting
                    </>
                  ) : (
                    "Connect Wallet To Access Dashboard"
                  )}
                </button>
              )}
            </ConnectKitButton.Custom>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
}
