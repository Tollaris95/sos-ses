import axios from "axios";

const API_URL = "https://sos-ses.fr/api"; 

export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_URL}/user-jwt-verify`, { token });
    
    console.log("Token validé par le backend :", response.data);
    return true; // Le token est valide
  } catch (error: any) {
    console.error("Token invalide :", error.response?.data || error.message);
    return false; // Le token est invalide
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};
