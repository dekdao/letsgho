import Image from "next/image";

interface ProductDetailProps {
  image: string;
  name: string;
  price: number;
  description: string;
}

export function ProductDetail({ image, name, price, description }: ProductDetailProps) {
  return (
    <>
      <Image src={image} alt="product image" height={200} width={200} className="rounded-lg" />
      <h1 className="font-heading text-3xl lg:text-5xl ">${price}</h1>
      <h1 className="font-heading  text-3xl lg:text-5xl">{name}</h1>
      <p className="text-lg lg:text-2xl font-medium leading-none">{description}</p>
    </>
  );
}
