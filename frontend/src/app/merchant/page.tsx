"use client";
import HomeLayout from "@/components/layouts/home-layout";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LuCircleSlash2, LuCreditCard, LuDollarSign, LuRefreshCw } from "react-icons/lu";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push("/merchant/dashboard");
    }
  }, [isConnected, router]);

  return (
    <HomeLayout hideNav>
      <section className="container relative md:px-56 space-y-6 pb-8 pt-28 min-h-[100vh] h-full w-full flex base:justify-center md:justify-start">
        <div className="flex max-w-[50rem] flex-col gap-4">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">Lets GHO Merchant</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {[
              [<LuDollarSign key={1} />, "Gasless Payment"],
              [<LuCreditCard key={2} />, "Credit-Debit Support"],
              [<LuCircleSlash2 key={3} />, "Zero Fees And Zero Interest Period"]
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
        <div className="absolute base:bottom-40 md:bottom-4 right-14 flex items-center justify-center dark:invert">
          <Image src="/landing-stickman.png" alt="landing stickman" width={800} height={800} />
        </div>
      </section>
    </HomeLayout>
  );
}
