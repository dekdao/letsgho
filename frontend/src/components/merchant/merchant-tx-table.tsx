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
          <TableHead>Product Id</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {txs.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.productId}</TableCell>
            <TableCell className="font-medium">${p.amount}</TableCell>
            <TableCell>
              <Badge className={cn(`bg-${STATUS_COLORS[p.status]}-500`, `hover:bg-${STATUS_COLORS[p.status]}-600`)}>
                {p.status}
              </Badge>
            </TableCell>
            <TableCell>{p.receiver.slice(0, 12)}</TableCell>
            <TableCell>{new Date(p.createdAt).toLocaleDateString("en-US")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
