import axios from "axios";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id;
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/product/` + id);
  return {
    title: `Let's GHO Pay: ${data.data.name}`,
    description: data.data.description
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col h-screen">{children}</div>;
}
