"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs } from "@/components/ui/tabs";
import { ProductProps } from "@/types/productType";
import {
  getUserRoles,
  isLogged,
  isTokenExpired,
  logout,
} from "@/utils/account.service";
import { deleteProduct, getProduct } from "@/utils/axiosProductsUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PanelLeft, PlusCircle, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Cart } from "@/components/Cart";
import { EditProductForm } from "@/components/forms/EditProductForm";
import { AvatarDropdown } from "@/components/AvatarDropdown";
import { ProductBreacrumb } from "@/components/breadcrumbs/ProductBreacrumb";
import { addToCart } from "@/utils/axiosCartUtils";

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const [isEditing, setisEditing] = useState(false);

  function toggleIsEditing() {
    setisEditing(!isEditing);
  }

  const { data: productData, isLoading } = useQuery<ProductProps>({
    queryKey: ["product", params.slug],
    queryFn: () => getProduct(params.slug),
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      router.push("/products");
    },
    onError: (err) => alert(err.message),
  });

  const {
    mutate: addToCartMutate,
    isPending,
    variables,
  } = useMutation({
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
                        if (isTokenExpired() || !isLogged()) {
                          logout();
                          router.push("/login");
                        } else {
                          addToCartMutate(params.slug);
                        }
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
                  {isLogged() && (
                    // getUserRoles().includes("ROLE_ADMIN") &&
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
                      <Button
                        className="mt-6"
                        variant="outline"
                        onClick={() => {
                          if (isTokenExpired() || !isLogged()) {
                            logout();
                            router.push("/login");
                          } else {
                            mutate(params.slug);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
            {!isLoading && isEditing && (
              <div>
                <EditProductForm
                  {...productData}
                  toggleIsEditing={toggleIsEditing}
                />
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
