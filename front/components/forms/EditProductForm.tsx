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
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/utils/axiosLoginUtils";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/utils/axiosProductsUtils";

const EditProductFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  photo: z.string(),
  price: z.number(),
});

export type EditProductFormFields = z.infer<typeof EditProductFormSchema>;

export function EditProductForm({
  id,
  name,
  description,
  photo,
  price,
}: EditProductFormFields) {
  const form = useForm<z.infer<typeof EditProductFormSchema>>({
    resolver: zodResolver(EditProductFormSchema),
  });

  const { toast } = useToast();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      router.push("/products");
      toast({
        title: "Le produit a bien été modifié !",
      });
    },
    onError: (error) => {
      console.error("error", error);
      toast({
        title: "Error",
        description: "An error occured",
      });
    },
  });

  function onSubmit(data: z.infer<typeof EditProductFormSchema>) {
    // mutate(data.data);
    console.log("coucou");
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
                  defaultValue={name}
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
                defaultValue={description}
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
                defaultValue={photo}
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
                defaultValue={Number(price)}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={price.toString()}
                        {...field}
                        type="number"
                      />
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
