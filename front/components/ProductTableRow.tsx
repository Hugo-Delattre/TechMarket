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
import { addToCartAxios } from "@/utils/cardUtils";
import { ProductProps } from "@/types/productType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export const ProductTableRow = ({
  id,
  photo,
  name,
  description,
  price,
}: ProductProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, variables } = useMutation({
    //TODO implement optimistic update
    mutationFn: (id: string) => addToCartAxios(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    mutationKey: ["addToCart"],
    onError: (err) => alert(err.message),
  });
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
      <TableCell className="font-medium">
        <Link href={`/products/${id}`}>{name}</Link>
      </TableCell>
      <TableCell>{description}</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell>{price}€</TableCell>
      <TableCell>
        <Button
          className="border bg-white hover:border-grey transition-all duration-200"
          aria-haspopup="true"
          size="icon"
          variant="ghost"
          onClick={() => {
            mutate(id);
          }}
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
