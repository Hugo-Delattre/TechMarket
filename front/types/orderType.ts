import { ProductProps } from "@/types/productType";

export type OrderProps = {
  id: string;
  totalPrice: string;
  creationDate: string;
  products: ProductProps[];
};
