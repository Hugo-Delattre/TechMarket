import axios from "axios";

export const getProducts = async () => {
  try {
    console.log("fetch started");
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto");
    console.log("response", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProduct = async (id: string) => {
  try {
    console.log("fetch started");
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log("response", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export const createProduct = async (product: any) => {
  try {
    console.log("fetch started");
    const response = await axios.post("https://pokeapi.co/api/v2/pokemon", product);
    console.log("response", response.data);
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export const updateProduct = async (id: string, product: any) => {
  try {
    console.log("fetch started");
    const response = await axios.put(`https://pokeapi.co/api/v2/pokemon/${id}`, product);
    console.log("response", response.data);
    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export const deleteProduct = async (id: string) => {
  try {
    console.log("fetch started");
    const response = await axios.delete(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log("response", response.data);
    return response;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}