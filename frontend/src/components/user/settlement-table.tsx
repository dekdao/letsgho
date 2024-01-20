import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { LuLink } from "react-icons/lu";

const settlements = [
  {
    id: "1234",
    date: "19/1/2024",
    amount: 100.0,
    interest: 6.52,
    status: "Paid",
    paymentDue: "31/12/2023",
    link: "https://sepolia.etherscan.io/"
  },
  {
    id: "123",
    date: "20/11/2023",
    amount: 100.0,
    interest: 0.0,
    status: "Paid",
    paymentDue: "30/11/2023",
    link: "https://sepolia.etherscan.io/"
  }
];

export function SettlementTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Interest</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment Due Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {settlements.map((settlement) => (
          <TableRow key={settlement.id}>
            <TableCell>{settlement.date}</TableCell>
            <TableCell className="font-medium">$ {settlement.amount}</TableCell>
            <TableCell className="font-medium">$ {settlement.interest}</TableCell>
            <TableCell>{settlement.status}</TableCell>
            <TableCell>{settlement.paymentDue}</TableCell>
            <TableCell>
              <Link href={settlement.link} target="_blank">
                <LuLink />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>$ {settlements.reduce((accumulator, settlement) => accumulator + settlement.amount, 0)}</TableCell>
          <TableCell colSpan={4}>
            $ {settlements.reduce((accumulator, settlement) => accumulator + settlement.interest, 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
