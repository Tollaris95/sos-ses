import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.REACT_APP_JWT_SECRET; 

export const verifyToken = (token: string): boolean => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Token décodé :", decoded);
    return true;
  } catch (error) {
    console.error("Token invalide :", error);
    return false;
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};
