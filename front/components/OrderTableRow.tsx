import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { ProductTableRowProps } from "./ProductTableRow";

export type OrderTableRowProps = {
  name: string;
  id: string;
  products?: ProductTableRowProps[];
  creationDate?: Date;
  totalPrice: number;
};

export const OrderTableRow = ({
  name,
  id,
  products,
  creationDate,
  totalPrice,
}: OrderTableRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{name}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          buyer mail
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">{id}</TableCell>
      <TableCell className="hidden sm:table-cell">
        {products?.map((product) => product.name).join(", ")}
        {/* <Badge className="text-xs" variant="outline">
          Declined
        </Badge> */}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {creationDate?.toString()}
      </TableCell>
      <TableCell className="text-right">
        {totalPrice && `${totalPrice}€`}
      </TableCell>
    </TableRow>
  );
};
