import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { addToCart } from "@/utils/axiosCartUtils";
import { ProductProps } from "@/types/productType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { isLogged, isTokenExpired, logout } from "@/utils/account.service";
import { useRouter } from "next/navigation";

export const ProductTableRow = ({
  id,
  photo,
  name,
  description,
  price,
}: ProductProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending, variables } = useMutation({
    mutationFn: (id: string) => addToCart(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
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
        <Link href={`/products/${id}`}>
          {name.length > 30 ? `${name.substring(0, 30)}...` : name}
        </Link>
      </TableCell>
      <TableCell>
        {description.length > 40
          ? `${description.substring(0, 40)}...`
          : description}
      </TableCell>
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
            if (isTokenExpired() || !isLogged()) {
              logout();
              router.push("/login");
            } else {
              mutate(id.toString());
            }
          }}
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
