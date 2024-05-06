const jwt_decode = require("jwt-decode");

export const saveToken = (token: string) => {
  localStorage.setItem("jwt", token);
};

export const isLogged = () => {
  let token = localStorage?.getItem("jwt");
  return !!token;
};

export const isAdmin = () => {
  let userRole = getUserRole();
  return userRole?.includes("ROLE_ADMIN");
};

export const getToken = () => {
  return localStorage?.getItem("jwt");
};

export const getHeaders = () => {
  const jwt = getToken();
  return {
    Authorization: `Bearer ${jwt}`,
  };
};

export const getUserRole = () => {
  let token = localStorage?.getItem("jwt");
  if (token) {
    let decodedToken = decodeToken(token);
    return decodedToken.role;
  } else {
    return null;
  }
};

export const decodeToken = (token: string) => {
  const decodedToken = jwt_decode(token);
  return decodedToken;
};

export const logout = () => {
  localStorage.removeItem("jwt");
};
