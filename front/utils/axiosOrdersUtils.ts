import { OrderProps } from "@/types/orderType";
import { axiosInstance } from "@/utils/axiosInstance";
import axios from "axios";

export const getOrders = async () => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await axiosInstance.request({
      method: "get",
      url: "/orders",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching Orders:", error);
    throw error;
  }
};

export const getOrder = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching Order:", error);
    throw error;
  }
};

export const updateOrder = async (id: string, Order: OrderProps) => {
  try {
    const response = await axiosInstance.put(`orders/${id}`, Order);
    return response;
  } catch (error) {
    console.error("Error updating Order:", error);
    throw error;
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/orders/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting Order:", error);
    throw error;
  }
};
