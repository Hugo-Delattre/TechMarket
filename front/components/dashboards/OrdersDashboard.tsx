"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderTableRow } from "@/components/OrderTableRow";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/utils/axiosOrdersUtils";
import { OrderProps } from "@/types/orderType";
import { isLogged, isTokenExpired } from "@/utils/account.service";
import { AvatarDropdown } from "@/components/AvatarDropdown";
import OrdersBreadcrumb from "@/components/breadcrumbs/OrdersBreadcrumb";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const OrdersDashboard = () => {
  const router = useRouter();

  const {
    data: orders,
    isSuccess,
    isLoading,
    error,
  } = useQuery<OrderProps[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await getOrders();
      return response.data;
    },
    enabled: isLogged(),
  });

  useEffect(() => {
    if (!isLogged() || isTokenExpired()) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs"></SheetContent>
          </Sheet>
          <OrdersBreadcrumb />
          <div className="relative ml-auto flex-1 md:grow-0"></div>
          {isLogged() && <AvatarDropdown />}
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <Tabs defaultValue="week">
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>Recent orders.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden md:table-cell">
                            ID
                          </TableHead>
                          <TableHead>Products</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Order date
                          </TableHead>
                          <TableHead>Total price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders?.map((order) => (
                          <OrderTableRow
                            key={order.id}
                            id={order.id}
                            totalPrice={order.totalPrice}
                            creationDate={order.creationDate}
                            products={order.products}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};
