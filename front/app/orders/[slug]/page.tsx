"use client";

import { formatInTimeZone } from "date-fns-tz";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ProductProps } from "@/types/productType";
import { isLogged, isTokenExpired } from "@/utils/account.service";
import { useQuery } from "@tanstack/react-query";
import { PanelLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AvatarDropdown } from "@/components/AvatarDropdown";
import { ProductBreacrumb } from "@/components/breadcrumbs/ProductBreacrumb";
import { getOrder } from "@/utils/axiosOrdersUtils";
import { Separator } from "@/components/ui/separator";

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const [isEditing, setisEditing] = useState(false);

  function toggleIsEditing() {
    setisEditing(!isEditing);
  }

  useEffect(() => {
    if (!isLogged() || isTokenExpired()) {
      router.push("/login");
    }
  }, [isLogged, isTokenExpired]);

  const { data: orderData, isLoading } = useQuery<ProductProps>({
    queryKey: ["order", params.slug],
    queryFn: () => getOrder(params.slug),
    enabled: isLogged(),
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
            {orderData?.id && <ProductBreacrumb orderDataName={orderData.id} />}
            <div className="relative ml-auto flex-1 md:grow-0"></div>
            {isLogged() && <AvatarDropdown />}
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {/* {isLoading && ( */}
            {/* // <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-[50rem] p-6"> */}
            {/* <Skeleton className="w-full h-[40rem]" /> */}
            {/* <Skeleton className="w-[286px] h-[32px] mb-2" /> */}
            {/* <Skeleton className="w-[286px] h-[16px]" /> */}
            {/* <div className="mb-2"></div> */}
            {/* // </div> */}
            {/* )} */}
            {!isLoading && (
              <div>
                {!isLoading && orderData?.data && (
                  <div>
                    <Card className="flex justify-around items-center">
                      <Card className="flex items-center flex-col justify-center h-[20rem] border-[1.5px] min-w-[30rem] rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-2">
                          Total Price: {orderData.data.totalPrice}€
                        </h2>

                        <h3 className="text-xl mb-[0.33rem]">
                          {formatInTimeZone(
                            orderData.data.creationDate.date,
                            "Europe/Paris",
                            "yyyy-MM-dd"
                          )}{" "}
                          at{" "}
                          {Number(
                            formatInTimeZone(
                              orderData.data.creationDate.date,
                              "Europe/Paris",
                              "HH"
                            )
                          ) + 2}
                          h
                          {formatInTimeZone(
                            orderData.data.creationDate.date,
                            "Europe/Paris",
                            "mm"
                          )}
                        </h3>
                        <h3 className="text-xl">
                          Order ID: {orderData.data.id}
                        </h3>
                      </Card>
                      <div className="flex gap-2 flex-col my-2">
                        {orderData.data.products.map((product, index) => (
                          <>
                            <div
                              key={index}
                              className="flex gap-2 items-center bg-slate-0 max-w-[30rem]"
                            >
                              <CardHeader>
                                <Image
                                  width={150}
                                  height={150}
                                  src={product.photo}
                                  alt={product.name}
                                ></Image>
                              </CardHeader>
                              <CardContent>
                                <div className="font-semibold mb-2">
                                  {product.name}
                                </div>
                                <CardDescription className="mb-6">
                                  {product.description}
                                </CardDescription>
                                {product.price}€
                              </CardContent>
                            </div>
                            <Separator />
                          </>
                        ))}
                      </div>
                    </Card>
                    <div className="flex gap-2 justify-between">
                      <div className="flex gap-2">
                        <Link href={"/orders"}>
                          <Button variant="outline" className="mt-6">
                            Go back to orders
                          </Button>{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
