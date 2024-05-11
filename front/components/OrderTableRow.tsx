import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { MoreHorizontal, ShoppingCart } from "lucide-react";
import { ProductProps } from "@/types/productType";
import { deleteOrder } from "@/utils/axiosOrdersUtils";
import { OrderProps } from "@/types/orderType";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { isLogged, isTokenExpired, logout } from "@/utils/account.service";
import { useRouter } from "next/navigation";

export const OrderTableRow = ({
  id,
  totalPrice,
  creationDate,
  products,
}: OrderProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (err) => alert(err.message),
  });

  return (
    <TableRow className="w-full">
      <TableCell className="hidden md:table-cell">
        <Link href={`/orders/${id}`}>#{id}</Link>
      </TableCell>

      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <TableCell className="font-medium flex gap-1">
                <Link href={`/orders/${id}`} className="font-medium flex gap-1">
                  {products.slice(0, 6).map((product) => (
                    <img
                      key={product.id}
                      width="50"
                      height="50"
                      src={product?.photo && product.photo}
                      alt="id"
                      className="rounded-lg"
                    />
                  ))}
                </Link>
              </TableCell>
            </TooltipTrigger>
            <TooltipContent>
              <Link href={`/orders/${id}`}>
                <p>{products.map((product) => product.name).join(", ")}</p>
              </Link>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <TableCell className="hidden md:table-cell">
        <Link href={`/orders/${id}`}>
          {format(creationDate.date, "yyyy-MM-dd")}
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`/orders/${id}`}>{totalPrice}€</Link>
      </TableCell>
      <TableCell>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
              <DropdownMenuItem>
                <DialogTrigger onClick={(e) => e.stopPropagation()}>
                  Delete
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      this order from our servers.
                    </DialogDescription>
                    <div className="flex gap-2">
                      <Button
                        className="bg-red-900"
                        onClick={() => {
                          if (isTokenExpired() || !isLogged()) {
                            logout();
                            router.push("/login");
                          } else {
                            mutate(id);
                          }
                        }}
                      >
                        Delete
                      </Button>
                      <Button>Cancel</Button>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};
