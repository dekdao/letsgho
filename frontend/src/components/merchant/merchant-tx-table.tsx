import { Transaction } from "@/interfaces/transactions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export const STATUS_COLORS = {
  settled: "green",
  unsettled: "yellow",
  refunded: "red"
} as const;

export const MerchantTxTable = ({ txs }: { txs: Transaction[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {txs.map((p) => (
          <TableRow key={p.id}>
            <TableCell className="max-w-[20px] overflow-hidden">{p.id}</TableCell>
            <TableCell className="flex flex-row gap-1 items-center">
              <img src={p.product.imageUrl} className="rounded-full h-full max-w-8 aspect-square object-cover" />
              <text>{p.product.name}</text>
            </TableCell>
            <TableCell className="font-medium">${p.product.price}</TableCell>
            <TableCell>
              <Badge className={cn(`bg-${STATUS_COLORS[p.status]}-500`, `hover:bg-${STATUS_COLORS[p.status]}-600`)}>
                {p.status}
              </Badge>
            </TableCell>
            <TableCell>{p.payer.slice(0, 12)}</TableCell>
            <TableCell>{new Date(p.createdAt).toLocaleDateString("en-US")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
