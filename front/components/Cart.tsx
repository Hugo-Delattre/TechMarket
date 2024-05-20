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
import { Separator } from "@/components/ui/separator";
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getCart, removeFromCart, validateCart } from "@/utils/axiosCartUtils";
import { useRouter } from "next/navigation";
import { toast, useToast } from "@/components/ui/use-toast";
import { CartProps } from "@/types/cartType";
import { isLogged, isTokenExpired, logout } from "@/utils/account.service";
import { LoadingSpinner } from "@/components/ui/spinner";

export const Cart = () => {
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const storedCart = localStorage.getItem("CartProducts");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const {
    data: cartData,
    isPending,
    isError,
    error,
  } = useQuery<CartProps[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      if (isTokenExpired()) {
        router.push("/login");
      } else {
        const response = await getCart();
        return response.data;
      }
    },
    enabled: isLogged(),
    staleTime: 1000 * 60 * 15,
    gcTime: Infinity,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: number) => removeFromCart(id),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    mutationKey: ["removeFromCart"],
    onError: (err) => alert(err.message),
  });

  const {
    mutate: validationMutate,
    isPending: isValidationPending,
    isSuccess: isValidationSuccess,
  } = useMutation({
    mutationFn: (orderId: number) => validateCart(orderId),
    onSuccess: (data) => {
      if (data?.payment_url) {
        const stripeUrl = data.payment_url;
        router.push(stripeUrl);
      }
    },
    onError: (err) => alert(err.message),
  });

  const variables = useMutationState({
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
      <CardContent className="space-y-2 flex flex-col">
        {cartData &&
          cartData?.products?.length > 0 &&
          cartData.products.map((product) => {
            return (
              <React.Fragment key={product.id}>
                <div className="space-y-2 flex justify-between items-center">
                  <img width={80} height={80} src={product.photo} />
                  <p className="text-sm text-right">{product.price}€</p>
                  <X
                    opacity={0.4}
                    onClick={() => {
                      if (isTokenExpired() || !isLogged()) {
                        logout();
                        router.push("/login");
                      } else {
                        mutate(product.id);
                      }
                    }}
                    size={20}
                    className="cursor-pointer hover:opacity-100 transition-opacity duration-200 rounded-sm p-[0.1rem] ml-1"
                  />
                </div>
                <Separator />
              </React.Fragment>
            );
          })}
        {/* {variables &&
          productsData &&
          variables.length > 0 &&
          variables.map((variable) => {
            return (
              <div key={variable}>
                <Skeleton className="w-[138px] h-[80px]" />
                <Separator />
              </div>
            );
          })} */}
      </CardContent>
      <CardFooter className="w-full flex flex-col">
        {cartData && cartData?.products.length > 0 && (
          <>
            <p className="font-semibold text-center pb-1">
              {cartData && cartData.totalPrice + "€"}
            </p>
            <Button
              disabled={isValidationPending || isValidationSuccess}
              className="w-full"
              onClick={() => {
                if (isTokenExpired() || !isLogged()) {
                  logout();
                  router.push("/login");
                } else {
                  validationMutate(cartData?.id);
                  toast({
                    title: "Redirecting...",
                    description:
                      "You will be sent to Stripe secured payment page in a few seconds.",
                  });
                }
              }}
            >
              Order
            </Button>
            {variables && variables.length > 0 && (
              <LoadingSpinner className="mt-4" />
            )}
          </>
        )}
      </CardFooter>
    </Card >
  );
};
