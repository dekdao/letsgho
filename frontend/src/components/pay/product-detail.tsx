"use client";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductDetailProps {
  image: string;
  name: string;
  price: number;
  description: string;
  loading: boolean;
}

export function ProductDetail({ image, name, price, description, loading }: ProductDetailProps) {
  return (
    <>
      {!loading && (
        <>
          <Image src={image} alt="product image" height={200} width={200} className="rounded-lg" />
          <h1 className="font-heading text-3xl lg:text-5xl ">${price}</h1>
          <h1 className="font-heading  text-3xl lg:text-5xl">{name}</h1>
          <p className="text-lg lg:text-2xl font-medium leading-none">{description}</p>
        </>
      )}
      {loading && (
        <>
          <Skeleton className="w-[200px] h-[200px] rounded-lg" />
          <Skeleton className="w-[100%] h-[30px] rounded-lg" />

          <Skeleton className="w-[100%] h-[30px] rounded-lg" />

          <Skeleton className="w-[100%] h-[30px] rounded-lg" />
        </>
      )}
    </>
  );
}
