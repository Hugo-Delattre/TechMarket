import { jwtDecode } from "jwt-decode";

export const saveToken = (token: string) => {
  localStorage.setItem("jwt", token);
};

export const isLogged = () => {
  if (typeof window !== "undefined") {
    let token = localStorage.getItem("jwt");
    return !!token;
  }
  return false;
};

export const isAdmin = () => {
  let userRole = getUserRoles();
  return userRole?.includes("ROLE_ADMIN");
};

export const getToken = () => {
  return localStorage?.getItem("jwt");
};

export const getHeaders = () => {
  const jwt = localStorage.getItem("jwt");
  const headers = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  return headers;
};

export const getUserRoles = () => {
  let token = localStorage?.getItem("jwt");
  if (token) {
    let decodedToken = decodeToken(token);
    // const isAdmin = getUserRoles().includes("ROLE_ADMIN");
    return decodedToken.roles;
  } else {
    return null;
  }
};

export const decodeToken = (token: string) => {
  const decodedToken = jwtDecode(token);
  return decodedToken;
};

export const logout = () => {
  if (localStorage.getItem("jwt")) {
    localStorage.removeItem("jwt");
  }
};

export const isTokenExpired = () => {
  const token = localStorage.getItem("jwt");
  if (token === null) {
    return true;
  } else if (token) {
    let decodedToken = decodeToken(token);
    const isTokenExpired = decodedToken.exp < Date.now() / 1000;
    if (isTokenExpired) {
      localStorage.removeItem("jwt");
    }
    return isTokenExpired;
  }

  return false;
};
