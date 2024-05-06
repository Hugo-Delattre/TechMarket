"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { Cart } from "@/components/Cart";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "TechMarket",
//   description: "Your go to marketplace for tech products",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>
          <Navbar />
          {children}
          <Toaster />
        </body>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </html>
  );
}
