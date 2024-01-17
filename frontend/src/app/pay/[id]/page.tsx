import type { Metadata } from "next";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ProductDetail } from "@/components/pay/product-detail";
import { PaymentDetail } from "@/components/pay/payment-detail";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id;
  return {
    title: "Let's GHO Pay: Product A",
    description: "Make crypto payment to John Doe Store for Product A"
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="flex w-[100vw] h-[100vh] justify-center">
      <div className="flex w-[80vw] m-4 border-2 rounded-md border-[black]">
        <div className="flex flex-col  gap-6 p-[5%] pt-[10%] w-[50%]">
          <ProductDetail image="/dekdao.png" name="Product A" price={100} description="Product A description" />
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col  gap-6 p-[5%] w-[50%]">
          <PaymentDetail />
        </div>
      </div>
    </div>
  );
}
