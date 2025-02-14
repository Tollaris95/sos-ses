import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // Assurez-vous que cette variable est bien définie

export const createCourse = async (courseData: { matiere: string; classe: string; chapitre: string }) => {
  try {
    const response = await axios.post(`${API_URL}/course-create`, courseData);
    return response.data;
  } catch (error: any) {
    console.error("Erreur lors de la création du cours :", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Erreur de création du cours");
  }
};
