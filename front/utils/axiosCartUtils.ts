import { isTokenExpired } from "@/utils/account.service";
import { axiosInstance } from "@/utils/axiosInstance";

export const getCart = async () => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await axiosInstance.request({
      method: "get",
      url: "/carts",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addToCart = async (id: string) => {
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

export const validateCart = async (idOrder: number) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await axiosInstance.request({
      method: "post",
      url: `/cart/validate`,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data: {
        orderId: idOrder,
        success_url: "http://localhost:3000/order-complete",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
