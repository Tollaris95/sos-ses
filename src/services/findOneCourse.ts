import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // Assurez-vous que cette variable est bien définie

// Service pour récupérer un cours spécifique par ID avec tout son contenu
export const findOneCourse = async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/course-find-one`, {
        params: { id },
      });
      return response.data;
    } catch (error: any) {
      console.error("Erreur lors de la récupération du cours :", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erreur de récupération du cours");
    }
  };