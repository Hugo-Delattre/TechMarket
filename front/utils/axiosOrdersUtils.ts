import { OrderProps } from "@/types/orderType";
import { axiosInstance } from "@/utils/axiosInstance";
import axios from "axios";

export const getOrders = async () => {
  try {
    const response = await axiosInstance.get<OrderProps[]>("/orders");
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

export const createOrder = async (Order: any) => {
  try {
    const response = await axiosInstance.post(
      "https://pokeapi.co/api/v2/pokemon",
      Order
    );
    return response;
  } catch (error) {
    console.error("Error creating Order:", error);
    throw error;
  }
};

export const updateOrder = async (id: string, Order: any) => {
  try {
    const response = await axiosInstance.put(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
      Order
    );
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
