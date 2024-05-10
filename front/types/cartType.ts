import { ProductProps } from "@/types/productType";

export type CartProps = {
  id: number;
  totalPrice: number;
  creationDate: Date;
  products: ProductProps[];
};
