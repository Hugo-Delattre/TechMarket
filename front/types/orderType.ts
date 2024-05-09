import { ProductProps } from "@/types/productType";

export type OrderProps = {
  id: number;
  totalPrice: number;
  creationDate: Date;
  products: ProductProps[];
};
