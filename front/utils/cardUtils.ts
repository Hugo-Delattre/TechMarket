import { ProductProps } from "@/types/productType";

export const addToCart = ({ id, photo, name, description, price }: ProductProps) => {
  let cart = localStorage.getItem("CartProducts");
  cart = cart ? JSON.parse(cart) : null;
  if (Array.isArray(cart)) {
    cart.push({ id, photo, name, description, price });
  } else {
    cart = [{ id, photo, name, description, price }];
  }
  localStorage.setItem("CartProducts", JSON.stringify(cart));
};
