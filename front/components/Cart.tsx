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
import { ProductProps } from "@/types/productType";
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

  return (
    <Card className="flex flex-col items-end">
      <CardHeader>
        <CardTitle>Your cart</CardTitle>
        <CardDescription>{"Order when you're ready."}</CardDescription>
      </CardHeader>
      {cart.length > 0 && (
        <CardContent className="space-y-2 flex flex-col">
          {cart.length > 0 &&
            cart.map((product: ProductProps) => (
              <React.Fragment key={product.id}>
                <div className="space-y-1 flex justify-between items-center">
                  {/* <Label htmlFor="name">{product.name}</Label> */}
                  <img width={80} height={80} src={product.photo} />
                  <p className="text-sm text-right">{product.price}€</p>
                </div>
                <Separator />
              </React.Fragment>
            ))}
        </CardContent>
      )}
      <CardFooter className="w-full flex flex-col">
        <p className="font-semibold text-center pb-1">
          {cart.length > 0 &&
            cart
              .reduce((total, product) => total + product.price, 0)
              .toFixed(2)}
          {cart.length > 0 && "€"}
        </p>
        <Button className="w-full">Order</Button>
      </CardFooter>
    </Card>
  );
};
