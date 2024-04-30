import axios from "axios";
import { axiosInstance } from "@/utils/axiosInstance";

export const loginUser = async (user: any) => {
  try {
    console.log("login started");
    const response = await axiosInstance.post(
      "/login", user
    );
    console.log("response", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching Users:", error);
    throw error;
  }
};

export const registerUser = async (user: any) => {
  try {
    console.log("register started");
    const response = await axiosInstance.post("/register", user);
    console.log("response", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching Users:", error);
    throw error;
  }
}