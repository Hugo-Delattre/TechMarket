import { ProductProps } from "@/types/ProductType";

export const addToCart = ({ id, image, name, description, price }: ProductProps) => {
  let cart = localStorage.getItem("CartProducts");
  cart = cart ? JSON.parse(cart) : null;
  if (Array.isArray(cart)) {
    cart.push({ id, image, name, description, price });
  } else {
    cart = [{ id, image, name, description, price }];
  }
  localStorage.setItem("CartProducts", JSON.stringify(cart));
};
