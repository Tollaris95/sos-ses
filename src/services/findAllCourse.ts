import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // Assurez-vous que cette variable est bien définie

// Service pour récupérer tous les cours (ID + titre uniquement)
export const getAllCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/course-find-all`);
    return response.data;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des cours :", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Erreur de récupération des cours");
  }
};