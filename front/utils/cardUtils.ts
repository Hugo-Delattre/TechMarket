import { ProductProps } from "@/types/productType";
import { axiosInstance } from "@/utils/axiosInstance";

export const addToCartAxios = async (id: string) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await axiosInstance.request({
      method: "post",
      url: `/carts/${id}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const removeFromCart = async (id: number) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await axiosInstance.delete(`/carts/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
