import { axiosInstance } from "@/utils/axiosInstance";

export const getLoggedUserData = async () => {
  try {
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

export const updateUser = async (User: any) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await axiosInstance.put(`/users`, User, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating User:", error);
    throw error;
  }
};
