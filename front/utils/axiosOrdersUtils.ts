import { OrderProps } from "@/types/orderType";
import { axiosInstance } from "@/utils/axiosInstance";
import axios from "axios";

export const getOrders = async () => {
  try {
    console.log("fetch started");
    const response = await axiosInstance.get<OrderProps[]>("/orders");
    console.log("response", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching Orders:", error);
    throw error;
  }
};

export const getOrder = async (id: string) => {
  try {
    console.log("fetch started");
    const response = await axiosInstance.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    console.log("response", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching Order:", error);
    throw error;
  }
};

export const createOrder = async (Order: any) => {
  try {
    console.log("fetch started");
    const response = await axiosInstance.post(
      "https://pokeapi.co/api/v2/pokemon",
      Order
    );
    console.log("response", response.data);
    return response;
  } catch (error) {
    console.error("Error creating Order:", error);
    throw error;
  }
};

export const updateOrder = async (id: string, Order: any) => {
  try {
    console.log("fetch started");
    const response = await axiosInstance.put(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
      Order
    );
    console.log("response", response.data);
    return response;
  } catch (error) {
    console.error("Error updating Order:", error);
    throw error;
  }
};

export const deleteOrder = async (id: string) => {
  try {
    console.log("delete started");
    console.log("id", id);
    console.log(`${axiosInstance.defaults.baseURL}/orders/${id}`);

    const response = await axiosInstance.delete(`/orders/${id}`);
    console.log("response", response.data);
    return response;
  } catch (error) {
    console.error("Error deleting Order:", error);
    throw error;
  }
};
