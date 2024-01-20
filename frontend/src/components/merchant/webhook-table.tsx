import { Webhook } from "@/interfaces/webhook";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export const WebhookTable = ({ webhooks }: { webhooks: Webhook[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Url</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Error Rate</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {webhooks.map((p) => (
          <TableRow key={p.id}>
            <TableCell className="max-w-[20px] overflow-hidden">{p.id}</TableCell>
            <TableCell className="max-w-[200px] text-ellipsis">{p.url}</TableCell>
            <TableCell className="font-medium flex flex-col">
              {p.events.map((e, i) => (
                <Badge key={i} className="w-fit">
                  {e}
                </Badge>
              ))}
            </TableCell>
            <TableCell className="font-medium">0%</TableCell>
            <TableCell>
              <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
