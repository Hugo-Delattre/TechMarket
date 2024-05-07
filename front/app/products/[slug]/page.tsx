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

const schema = z.object({
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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  // add the useMutation

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await console.log("formData", data);
    // add the mutation.mutate(data);
  };

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
          {/* <BreadcrumbNav /> */}
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <Link href="/products">Products</Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <Link href="#">{`${productData?.name}`}</Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0"></div>
          {isLogged() && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Image
                    src="/profile.png"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    router.push("/login");
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
              <div className="flex gap-2">
                <Button className="w-[120px] mt-6">Add to Cart</Button>
                <Button
                  className="w-[120px] mt-6"
                  variant="outline"
                  onClick={() => {
                    setisEditing(!isEditing);
                  }}
                >
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>
            </div>
          )}
          {!isLoading && isEditing && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex gap-2 flex-col"
            >
              <Controller
                {...register("name")}
                name="name"
                control={control}
                defaultValue={productData?.name}
                render={({ field }) => <Input {...field} />}
              />
              {errors.name && <p>{errors.name.message}</p>}

              <Controller
                {...register("description")}
                name="description"
                control={control}
                defaultValue={productData?.description}
                render={({ field }) => <Input {...field} />}
              />
              {errors.description && <p>{errors.description.message}</p>}

              <Controller
                {...register("price")}
                name="price"
                control={control}
                defaultValue={productData?.price}
                render={({ field }) => <Input {...field} />}
              />
              {errors.price && <p>{errors.price.message}</p>}

              <Button type="submit">Submit</Button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
