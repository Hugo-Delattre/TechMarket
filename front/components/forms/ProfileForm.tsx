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
import { useMutation, useQuery } from "@tanstack/react-query";
import { loginUser } from "@/utils/axiosLoginUtils";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { UserType } from "@/types/userType";
import { getLoggedUserData, updateUser } from "@/utils/axiosUsersUtils";
import { logout } from "@/utils/account.service";
import { useEffect } from "react";

const FormSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
});

export function ProfileForm() {
  const {
    data: userData,
    isSuccess,
    isLoading,
    error,
  } = useQuery<UserType>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getLoggedUserData();
      return response.data;
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: userData?.email || "",
      firstName: userData?.firstname || "",
      lastName: userData?.lastname || "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      form.reset({
        email: userData?.email,
        firstName: userData?.firstname,
        lastName: userData?.lastname,
      });
    }
  }, [isSuccess, userData, form]);

  const { toast } = useToast();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: (user) => {
      updateUser(user);
    },
    onSuccess: (data) => {
      router.push("/products");
      toast({
        title: "Success!",
        description: "Your profile have been updated.",
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data);
  }

  return (
    <Card className="mx-auto w-[25rem]">
      <CardHeader>
        <CardTitle className="text-2xl">{userData?.login}'s profile</CardTitle>
        <CardDescription>Consult and edit your profile.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="toto33@gmail.com"
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
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="Thomas" {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Harit" {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
              <Button
                variant="outline"
                className="w-full mt-2"
                type="button"
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
              >
                Logout
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
