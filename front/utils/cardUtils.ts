import { ProductProps } from "@/types/productType";
import { axiosInstance } from "@/utils/axiosInstance";

export const addToCartLocalStorage = ({
  id,
  photo,
  name,
  description,
  price,
}: ProductProps) => {
  let cart = localStorage.getItem("CartProducts");
  cart = cart ? JSON.parse(cart) : null;
  if (Array.isArray(cart)) {
    cart.push({ id, photo, name, description, price });
  } else {
    cart = [{ id, photo, name, description, price }];
  }
  localStorage.setItem("CartProducts", JSON.stringify(cart));
};

export const addToCartAxios = async (id: number) => {
  try {
    const { data } = await axiosInstance.post(`/carts/${id}`, id);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const removeFromCart = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/carts/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}
