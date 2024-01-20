import { LuLink, LuQrCode } from "react-icons/lu";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";

const products = [
  {
    name: "pornhub premium 1month",
    price: 10,
    soldAmount: 100,
    id: "12345"
  }
] as const;

export const ProductTable = () => {
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
            <TableCell className="font-medium">${p.soldAmount}</TableCell>
            <TableCell className="flex flex-row gap-1 *:rounded-full">
              <Button variant="outline">
                <LuLink />
              </Button>
              <Button variant="outline">
                <LuQrCode />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
