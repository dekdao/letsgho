"use client";
import type { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const metadata: Metadata = {
  title: "Let's GHO Pay"
};

export default function PayPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/pay/WmIkz5vQP0dNSayVFOBG");
  }, [router]);
  return <div className="flex w-[100vw] h-[100vh] justify-center items-center">Redirecting...</div>;
}
