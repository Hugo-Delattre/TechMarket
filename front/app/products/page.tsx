import React from "react";
import { ProductsDashboard } from "../../components/dashboards/ProductsDashboard";
import { Cart } from "@/components/Cart";

const Page = () => {
  return (
    <div className="flex justify-between w-full">
      <ProductsDashboard />
      <Cart />
    </div>
  );
};

export default Page;
