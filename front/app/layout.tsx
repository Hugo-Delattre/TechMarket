"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./globals.css";
import Navbar from "@/components/Navbar";
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
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // Time before refetch on next render - 5mn
        gcTime: 1000 * 60 * 25, // Garbage collection - 25mn
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>
          <Navbar />
          {children}
          <Toaster />
        </body>
      </QueryClientProvider>
    </html>
  );
}
