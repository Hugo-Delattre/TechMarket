import axios from "axios";
import { axiosInstance } from "@/utils/axiosInstance";

export const loginUser = async (user: any) => {
  try {
    const response = await axiosInstance.post(
      "/login", user
    );
    return response;
  } catch (error) {
    console.error("Error fetching Users:", error);
    throw error;
  }
};

export const registerUser = async (user: any) => {
  try {
    const response = await axiosInstance.post("/register", user);
    return response;
  } catch (error) {
    console.error("Error fetching Users:", error);
    throw error;
  }
}