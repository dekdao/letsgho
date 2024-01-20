import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const transactions = [
  {
    id: "1234",
    date: "19/1/2024",
    product: "Product A",
    store: "Store A",
    amount: 50,
    status: "pending"
  },
  {
    id: "123",
    date: "15/1/2024",
    product: "Product Good",
    store: "Good Store",
    amount: 1.0,
    status: "completed"
  },
  {
    id: "123",
    date: "14/1/2024",
    product: "Product Bad",
    store: "Good Store",
    amount: 99.0,
    status: "refunded"
  }
];

export function TransactionTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Store</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.product}</TableCell>
            <TableCell>{transaction.store}</TableCell>
            <TableCell>{transaction.amount} $</TableCell>
            <TableCell className="text-right">{transaction.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell colSpan={2}>
            {transactions.reduce(
              (accumulator, transaction) =>
                transaction.status === "refunded" ? accumulator : accumulator + transaction.amount,
              0
            )}{" "}
            $
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
