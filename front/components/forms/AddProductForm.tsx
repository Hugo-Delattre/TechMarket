"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { faker } from "@faker-js/faker";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "@/utils/axiosLoginUtils";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { createProduct } from "@/utils/axiosProductsUtils";

const AddProductFormSchema = z.object({
  photo: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
});

export function AddProductForm({ toggleAddingProduct }: any) {
  const form = useForm<z.infer<typeof AddProductFormSchema>>({
    resolver: zodResolver(AddProductFormSchema),
    defaultValues: {
      photo: faker.image.imageUrl(),
      // photo:
      // "https://media.ldlc.com/r150/ld/products/00/05/96/31/LD0005963148.jpg",
      // },
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (product) => createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast({
        title: "Success!",
        description: "Your product have been created successfully!",
      });
      // toggleAddingProduct();
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
      toggleAddingProduct();
    },
    onError: (error) => {
      console.error("error", error);
      toast({
        title: "Error",
        description: "An error occured",
      });
    },
  });

  function onSubmit(data: z.infer<typeof AddProductFormSchema>) {
    mutate(data);
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-2xl">New product</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://media.ldlc.com/r150/ld/products/00/05/96/31/LD0005963148.jpg"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="15" {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button type="submit" className="w-full mb-2">
                Submit
              </Button>
              <Button
                variant={"outline"}
                onClick={toggleAddingProduct}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
