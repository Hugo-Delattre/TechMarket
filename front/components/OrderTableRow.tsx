import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type ProductTableRowProps = {
  id: string;
  image: string;
  name: string;
  description: string;
  totalPrice: number;
  stripeLink?: string;
};

export const ProductTableRow = ({
  id,
  image,
  name,
  description,
  totalPrice,
  stripeLink,
}: ProductTableRowProps) => {
  return (
    <TableRow className="w-full">
      <TableCell className="hidden sm:table-cell">
        <Image
          alt={`${name} image`}
          className="aspect-square rounded-md object-cover"
          height="64"
          src={image}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell>{totalPrice}€</TableCell>
      <TableCell>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <Link href={stripeLink ? `${stripeLink}` : ""}>
            <ShoppingCart className="h-4 w-4" />
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
