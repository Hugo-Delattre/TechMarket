import axios from "axios";
import { axiosInstance } from "@/utils/axiosInstance";

export const getUsers = async () => {
  try {
    console.log("fetch started");
    const response = await axiosInstance.get("https://pokeapi.co/api/v2/pokemon/ditto");
    console.log("response", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching Users:", error);
    throw error;
  }
};

export const getUser = async (id: string) => {
  try {
    console.log("fetch started");
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log("response", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching User:", error);
    throw error;
  }
};

export const createUser = async (User: any) => {
  try {
    console.log("fetch started");
    const response = await axios.post(
      "https://pokeapi.co/api/v2/pokemon",
      User
    );
    console.log("response", response.data);
    return response;
  } catch (error) {
    console.error("Error creating User:", error);
    throw error;
  }
};

export const updateUser = async (id: string, User: any) => {
  try {
    console.log("fetch started");
    const response = await axios.put(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
      User
    );
    console.log("response", response.data);
    return response;
  } catch (error) {
    console.error("Error updating User:", error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    console.log("fetch started");
    const response = await axios.delete(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    console.log("response", response.data);
    return response;
  } catch (error) {
    console.error("Error deleting User:", error);
    throw error;
  }
};
