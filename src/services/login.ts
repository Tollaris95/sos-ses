import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (userName: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/user-login`, {
      userName,
      password,
    });

    return response.data; // Retourne les données de l'API
  } catch (error: any) {
    console.error("Erreur lors de la connexion :", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Erreur de connexion");
  }
};
