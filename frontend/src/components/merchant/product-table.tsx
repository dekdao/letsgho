import { LuLink, LuQrCode } from "react-icons/lu";
import { Button, buttonVariants } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Product } from "@/interfaces/product";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import QrSvg from "@wojtekmaj/react-qr-svg";
import { useToast } from "../ui/use-toast";

export const ProductTable = ({ products }: { products: Product[] }) => {
  const { toast } = useToast();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Sold Amount</TableHead>
          <TableHead>Payment Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((p) => (
          <TableRow key={p.id}>
            <TableCell className="max-w-[20px] overflow-hidden">{p.id}</TableCell>
            <TableCell className="flex flex-row gap-1 items-center">
              <img src={p.imageUrl} className="rounded-full h-full max-w-8 aspect-square object-cover" />
              <text>{p.name}</text>
            </TableCell>
            <TableCell className="font-medium">${p.price}</TableCell>
            <TableCell className="font-medium">{p.sold || 0}</TableCell>
            <TableCell className="flex flex-row gap-1 *:rounded-full">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  window?.navigator?.clipboard.writeText(`${window?.location?.origin}/pay/${p.id}`);
                  toast({
                    title: "Copied to clipboard",
                    description: "The link has been copied to your clipboard"
                  });
                }}
              >
                <LuLink />
              </Button>
              <Dialog>
                <DialogTrigger className={`${buttonVariants({ variant: "outline", size: "sm" })}`}>
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
