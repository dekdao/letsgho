"use client";

import { Separator } from "@/components/ui/separator";
import { ProductDetail } from "@/components/pay/product-detail";
import { PaymentDetail } from "@/components/pay/payment-detail";
import { useEffect, useState } from "react";
import { Product } from "@/interfaces/product";
import axios from "axios";

export default function Page({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/product/" + params.id).then(({ data }) => {
      setProduct(data.data);
    });
  }, [params.id]);

  return (
    <div className="flex w-[100vw] h-[100vh] justify-center">
      <div className="flex w-[80vw] m-4 border-2 rounded-md border-[black]">
        <div className="flex flex-col  gap-6 p-[5%] pt-[10%] w-[50%]">
          {product && (
            <ProductDetail
              image={product.imageUrl}
              name={product.name}
              price={product.price}
              description={product.description}
            />
          )}
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col  gap-6 p-[5%] w-[50%]">
          <PaymentDetail />
        </div>
      </div>
    </div>
  );
}
