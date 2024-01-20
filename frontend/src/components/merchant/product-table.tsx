import { LuLink, LuQrCode } from "react-icons/lu";
import { Button, buttonVariants } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Product } from "@/interfaces/product";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import QrSvg from "@wojtekmaj/react-qr-svg";
import { useToast } from "../ui/use-toast";

const products: (Product & {
  sold: number;
})[] = [
  {
    name: "pornhub premium 1month",
    price: 10,
    id: "12345",
    sold: 100,
    description: "b ruh",
    imageUrl: "",
    userAddress: "0x12345"
  }
];

export const ProductTable = () => {
  const { toast } = useToast();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Sold Amount</TableHead>
          <TableHead>Payment Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.name}</TableCell>
            <TableCell className="font-medium">${p.price}</TableCell>
            <TableCell className="font-medium">${p.sold}</TableCell>
            <TableCell className="flex flex-row gap-1 *:rounded-full">
              <Button
                variant="outline"
                onClick={() => {
                  window.navigator.clipboard.writeText(`${window.location.origin}/pay/${p.id}`);
                  toast({
                    title: "Copied to clipboard",
                    description: "The link has been copied to your clipboard"
                  });
                }}
              >
                <LuLink />
              </Button>
              <Dialog>
                <DialogTrigger className={`${buttonVariants({ variant: "outline" })}`}>
                  <LuQrCode />
                </DialogTrigger>
                <ProductQrCodeDialog id={p.id} />
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const ProductQrCodeDialog = ({ id }: { id: string }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Product QR Code</DialogTitle>
        <QrSvg value={`${window.location.origin}/pay/${id}`} />
      </DialogHeader>
    </DialogContent>
  );
};
