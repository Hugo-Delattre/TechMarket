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
import { addToCart } from "@/utils/cardUtils";
import { ProductProps } from "@/types/productType";

export const ProductTableRow = ({
  id,
  photo,
  name,
  description,
  price,
}: ProductProps) => {
  return (
    <TableRow className="w-full">
      <TableCell className="hidden sm:table-cell">
        <Image
          alt={`${name} image`}
          className="aspect-square rounded-md object-cover"
          height="64"
          src={photo}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell>{price}€</TableCell>
      <TableCell>
        <Button
          aria-haspopup="true"
          size="icon"
          variant="ghost"
          onClick={() => {
            addToCart({ id, photo, name, description, price });
          }}
        >
          <ShoppingCart className="h-4 w-4" />
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
