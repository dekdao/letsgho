import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Let's GHO Pay"
};

export default function PayPage() {
  return <div className="flex w-[100vw] h-[100vh] justify-center items-center">Pay</div>;
}
