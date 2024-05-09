"use client";

import { z } from "zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { BreadcrumbNav } from "@/components/Breadcrumb";
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs } from "@/components/ui/tabs";
import { ProductProps } from "@/types/productType";
import { isLogged, logout } from "@/utils/account.service";
import { getProduct } from "@/utils/axiosProductsUtils";
import { useQuery } from "@tanstack/react-query";
import { PanelLeft, PlusCircle, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { Cart } from "@/components/Cart";
import { EditProductForm } from "@/components/forms/EditProductForm";
import { AvatarDropdown } from "@/components/AvatarDropdown";
import { ProductBreacrumb } from "@/components/breadcrumbs/ProductBreacrumb";

const schema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  photo: z.string(),
});

type FormFields = z.infer<typeof schema>;

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const { data: productData, isLoading } = useQuery<ProductProps>({
    queryKey: ["product", params.slug],
    queryFn: () => getProduct(params.slug),
  });
  const [isEditing, setisEditing] = useState(false);

  return (
    <div className="flex overflow-y-scroll">
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
            {productData?.name && (
              <ProductBreacrumb productDataName={productData.name} />
            )}
            <div className="relative ml-auto flex-1 md:grow-0"></div>
            {isLogged() && <AvatarDropdown />}
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {isLoading && (
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-[306px] p-6">
                <Skeleton className="w-[200px] h-[200px]" />
                {/* <Skeleton className="w-[286px] h-[32px] mb-2" /> */}
                {/* <Skeleton className="w-[286px] h-[16px]" /> */}
                {/* <div className="mb-2"></div> */}
              </div>
            )}
            {!isLoading && (
              <div>
                <Card
                  className="flex items-center"
                  x-chunk="dashboard-06-chunk-0"
                >
                  <CardHeader>
                    <Image
                      width={200}
                      height={200}
                      src={productData?.photo}
                      alt={productData?.name}
                    ></Image>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="mb-2">{productData?.name}</CardTitle>
                    <CardDescription className="mb-6">
                      {productData?.description}
                    </CardDescription>
                    {productData?.price}€
                  </CardContent>
                </Card>
                <div className="flex gap-2 justify-between">
                  <div className="flex gap-2">
                    <Button
                      className="w-[120px] mt-6"
                      onClick={() => {
                        console.log("on click");
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Link href={"/products"}>
                      <Button variant="outline" className="mt-6">
                        Go back to products
                      </Button>{" "}
                    </Link>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="mt-6"
                      variant="outline"
                      onClick={() => {
                        setisEditing(!isEditing);
                      }}
                    >
                      {isEditing ? "Cancel editing" : "Edit"}
                    </Button>
                    <Button className="mt-6" variant="outline">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {!isLoading && isEditing && (
              <div>
                <EditProductForm {...productData} />
              </div>
            )}
          </main>
        </div>
      </div>
      <Cart />
    </div>
  );
};

export default ProductPage;
