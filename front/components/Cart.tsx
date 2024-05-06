"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { OrderProps } from "@/types/orderType";
import { ProductProps } from "@/types/productType";
import { getOrders } from "@/utils/axiosOrdersUtils";
import { useMutationState, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

export const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("CartProducts");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  console.log("cart", cart);

  const {
    data: ordersData,
    isPending,
    isError,
    error,
  } = useQuery<OrderProps[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await getOrders();
      return response.data;
    },
  });
  console.log("ordersData", ordersData);

  const variables = useMutationState<string>({
    filters: { mutationKey: ["addToCart"], status: "pending" },
    select: (mutation) => mutation.state.variables,
  });

  return (
    <Card className="flex flex-col items-center">
      <CardHeader>
        <CardTitle>Your cart</CardTitle>
        <CardDescription>{"Order when you're ready."}</CardDescription>
      </CardHeader>
      {/* {cart.length > 0 && (
        <CardContent className="space-y-2 flex flex-col">
          {cart.length > 0 &&
            cart.map((product: ProductProps) => (
              <React.Fragment key={product.id}>
                <div className="space-y-1 flex justify-between items-center">
                  <img width={80} height={80} src={product.photo} />
                  <p className="text-sm text-right">{product.price}€</p>
                </div>
                <Separator />
              </React.Fragment>
            ))}
        </CardContent>
      )} */}
      {ordersData &&
        ordersData[0]?.products.length > 0 &&
        ordersData[0].products.map((product) => {
          return (
            <React.Fragment key={product.id}>
              <div className="space-y-1 flex justify-between items-center">
                <img width={80} height={80} src={product.photo} />
                <p className="text-sm text-right">{product.price}€</p>
              </div>
              <Separator />
            </React.Fragment>
          );
        })}
      <CardFooter className="w-full flex flex-col">
        <p className="font-semibold text-center pb-1">
          {/* {cart.length > 0 &&
            cart
              .reduce((total, product) => total + product.price, 0)
              .toFixed(2)}
          {cart.length > 0 && "€"} */}
          {ordersData && ordersData[0] && ordersData[0].totalPrice + "€"}
        </p>
        <Button className="w-full">Order</Button>
      </CardFooter>
    </Card>
  );
};
