"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { updateProduct } from "@/utils/axiosProductsUtils";
import { isLogged, isTokenExpired, logout } from "@/utils/account.service";

const EditProductFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  photo: z.string(),
  price: z.string(),
});

interface EditProductFormProps {
  id: string;
  name: string;
  description: string;
  photo: string;
  price: string;
  toggleIsEditing: () => void;
}

export type EditProductFormFields = z.infer<typeof EditProductFormSchema>;

export function EditProductForm({
  id,
  name,
  description,
  photo,
  price,
  toggleIsEditing,
}: EditProductFormProps) {
  const form = useForm<EditProductFormFields>({
    resolver: zodResolver(EditProductFormSchema),
    defaultValues: {
      photo: photo,
      name: name,
      description: description,
      price: price.toString(),
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["products", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toggleIsEditing();
      router.push("/products");
      toast({
        title: "Le produit a bien été modifié !",
      });
    },
    onError: (error) => {
      console.error("error", error);
      router.push("/products");
    },
  });

  function onSubmit(data: z.infer<typeof EditProductFormSchema>) {
    if (isTokenExpired() || !isLogged()) {
      logout();
      router.push("/login");
    } else {
      mutate({ id, data });
    }
  }

  return (
    <Card className="w-full">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="grid gap-4">
              <div className="grid gap-2 mt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder={name} {...field} />
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
                      <Input placeholder={description} {...field} type="text" />
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
                      <Input placeholder={photo} {...field} type="text" />
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
                      <Input placeholder={price} {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
