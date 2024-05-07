import axios from "axios";
import { axiosInstance } from "@/utils/axiosInstance";
import { getHeaders, getToken } from "@/utils/account.service";

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(
      "https://pokeapi.co/api/v2/pokemon/ditto"
    );
    return response;
  } catch (error) {
    console.error("Error fetching Users:", error);
    throw error;
  }
};

export const getLoggedUserData = async () => {
  try {
    // const headers = getHeaders();
    const jwt = localStorage.getItem("jwt");
    const response = await axiosInstance.get("/users", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching Users:", error);
    throw error;
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching User:", error);
    throw error;
  }
};

export const createUser = async (User: any) => {
  try {
    const response = await axios.post(
      "https://pokeapi.co/api/v2/pokemon",
      User
    );
    return response;
  } catch (error) {
    console.error("Error creating User:", error);
    throw error;
  }
};

export const updateUser = async (id: string, User: any) => {
  try {
    const response = await axios.put(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
      User
    );
    return response;
  } catch (error) {
    console.error("Error updating User:", error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
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
