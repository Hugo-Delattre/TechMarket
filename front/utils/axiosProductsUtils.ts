import axios from "axios";
import { axiosInstance } from "@/utils/axiosInstance";

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProduct = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`products/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const createProduct = async (product: any) => {
  try {
    const response = await axiosInstance.post(
      "https://pokeapi.co/api/v2/pokemon",
      product
    );
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (id: string, product: any) => {
  try {
    const response = await axiosInstance.put(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
      product
    );
    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
