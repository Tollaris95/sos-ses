import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const updateCourse = async (courseData: {
  id: string;
  contenu: object;
}) => {
  try {
    const response = await axios.put(`${API_URL}/course-update`, courseData);
    console.log("🚀 ~ updateCourse ~ response:", response);

    return response.data;
  } catch (error: any) {
    console.error(
      "Erreur lors de la mise à jour du cours :",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Erreur de mise à jour du cours"
    );
  }
};
