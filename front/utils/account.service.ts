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
  let userRole = getUserRole();
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

// export const getUserRole = () => {
//   let token = localStorage?.getItem("jwt");
//   if (token) {
//     let decodedToken = decodeToken(token);
//     return decodedToken.role;
//   } else {
//     return null;
//   }
// };

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
    console.log("decodedToken.exp", decodedToken.exp);
    console.log("Date.now() / 1000", Date.now() / 1000);
    const isTokenExpired = decodedToken.exp < Date.now() / 1000;
    if (isTokenExpired) {
      localStorage.removeItem("jwt");
    }
    return decodedToken.exp < Date.now() / 1000;
  }

  return false;
};
