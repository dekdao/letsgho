import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const collaterals = [
  {
    id: "1234",
    chain: "SepoliaETH",
    currency: "ETH",
    amount: 0.01,
    value: 27.11
  },
  {
    id: "1234",
    chain: "SepoliaETH",
    currency: "USDC",
    amount: 100.0,
    value: 100.0
  }
];

export function CollateralTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Chain</TableHead>
          <TableHead>Currency</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {collaterals.map((collateral) => (
          <TableRow key={collateral.id}>
            <TableCell>{collateral.chain}</TableCell>
            <TableCell>{collateral.currency}</TableCell>
            <TableCell>
              {collateral.amount} {collateral.currency}
            </TableCell>
            <TableCell className="text-right">{collateral.value} $</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">
            {collaterals.reduce((accumulator, collateral) => accumulator + collateral.value, 0)} $
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
