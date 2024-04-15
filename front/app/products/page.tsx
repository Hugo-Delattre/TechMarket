import React from "react";
import { Button } from "@/components/ui/button";
import { ProductsDashboard } from "../../components/ProductsDashboard";

const products = () => {
  return (
    <div>
      <Button>Click me</Button>
      <ProductsDashboard />
    </div>
  );
};

export default products;
