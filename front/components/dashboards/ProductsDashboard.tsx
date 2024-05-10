"use client";

import Image from "next/image";
import Link from "next/link";
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ProductTableRow } from "@/components/ProductTableRow";
import { BreadcrumbNav } from "@/components/Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/utils/axiosProductsUtils";
import { ProductProps } from "@/types/productType";
import { isAdmin, isLogged, logout } from "@/utils/account.service";
import { useRouter } from "next/navigation";
import { AvatarDropdown } from "@/components/AvatarDropdown";
import { useState } from "react";
import { AddProductForm } from "@/components/forms/AddProductForm";

export function ProductsDashboard() {
  const [isAddingProduct, setisAddingProduct] = useState(false);
  const {
    data: productsData,
    isPending,
    isError,
    error,
  } = useQuery<ProductProps[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await getProducts();
      return response.data;
    },
  });
  const router = useRouter();

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
          <BreadcrumbNav />
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          {isLogged() && <AvatarDropdown />}
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            {isLogged() && (
              <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                  <Button
                    size="sm"
                    className="h-7 gap-1"
                    onClick={() => setisAddingProduct(!isAddingProduct)}
                  >
                    {!isAddingProduct && <PlusCircle className="h-3.5 w-3.5" />}
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      {!isAddingProduct
                        ? "Add Product"
                        : "Cancel product creation"}
                    </span>
                  </Button>
                </div>
              </div>
            )}
            {isAddingProduct && (
              <div className="mt-2">
                <AddProductForm />
              </div>
            )}
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    The best tech products are here. Check them out below.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="hidden md:table-cell">
                          {/* Total Sales */}
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          {/* Created at */}
                        </TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productsData?.map((product) => (
                        <ProductTableRow
                          key={product.id}
                          id={product.id}
                          photo={product.photo}
                          name={product.name}
                          description={product.description}
                          price={product.price}
                        />
                      )) || []}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>{productsData?.length}</strong> of{" "}
                    <strong>{productsData?.length}</strong> products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
