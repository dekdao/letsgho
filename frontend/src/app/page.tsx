import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/lib/router-events";
import { cn } from "@/lib/utils";
import { LuRocket, LuLink, LuPiggyBank } from "react-icons/lu";
import HomeLayout from "@/components/layouts/home-layout";
import Image from "next/image";

export default function Home() {
  return (
    <HomeLayout>
      <section className="space-y-6 pb-8 pt-28 lg:py-32">
        <div className="grid base:grid-cols-1 md:grid-cols-2">
          <div className="container flex max-w-[64rem] flex-col base:items-center md:items-end justify-center gap-4 md:text-end base:text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">letsgho.xyz</h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              An on-chain payment processor which supports both
              <br /> Credit and Debit payment powered by GHO
            </p>
            <div className="space-x-4">
              <Link href="/merchant/dashboard" className={cn(buttonVariants({ size: "lg" }))}>
                Get Started
              </Link>
            </div>
          </div>
          <div className="w-full h-full flex items-center justify-center dark:invert">
            <Image src="/landing-stickman.png" alt="landing stickman" width={700} height={700} />
          </div>
        </div>
      </section>
      <section id="features" className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Features</h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Step into the future of crpyto payment with letsgho.xyz
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <LuLink className="h-8 w-8" />
              <div className="space-y-2">
                <h3 className="font-bold">On-Chain Payment with GHO</h3>
                <p className="text-sm text-muted-foreground">
                  Leverage the power of GHO for secure, transparent, and decentralized on-chain payment processing.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <LuPiggyBank className="h-8 w-8" />
              <div className="space-y-2">
                <h3 className="font-bold">Gasless, No Transaction Fees</h3>
                <p className="text-sm text-muted-foreground">
                  Enjoy fee-free and gasless transactions, ensuring cost-effective and accessible digital payments.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <LuRocket className="w-8 h-8" />
              <div className="space-y-2">
                <h3 className="font-bold">Easy Integration, User-Friendly UI</h3>
                <p className="text-sm text-muted-foreground">
                  Effortless integration with a simple, intuitive interface, inspired by Stripe for hassle-free payment
                  processing.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            LetsGHO: Redefining web3 payments with effortless integration, zero fees, and gasless transactions. Your
            simple, efficient gateway to the future of digital transactions.
          </p>
        </div>
      </section>
    </HomeLayout>
  );
}
