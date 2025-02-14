// AddCourse.tsx
import React, { useState } from "react";
import { createCourse } from "../../services/createCourse";
import { updateCourse } from "../../services/updateCourse";
import EditCourseContent from "./EditCourseContent";

interface AddCourseProps {
  goBack: () => void;
}

const AddCourse: React.FC<AddCourseProps> = ({ goBack }) => {
  const [createdCourse, setCreatedCourse] = useState<any>(null);
  const [matiere, setMatiere] = useState("économie");
  const [classe, setClasse] = useState("seconde");
  const [chapitre, setChapitre] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const data = { matiere, classe, chapitre };
      const response = await createCourse(data);
      setCreatedCourse(response.course);
    } catch (error) {
      console.error("Erreur API :", error);
    }
  };

  // Callback pour sauvegarder le contenu avec effet de loading
  const handleSaveContent = async (content: string) => {
    try {
      setIsLoading(true);
      const data = { id: createdCourse.id, contenu: { html: content } };
      await updateCourse(data);
      console.log("🚀 ~ handleSaveContent ~ data:", data)
      setIsLoading(false);
      // Optionnel : afficher une notification de succès
    } catch (error) {
      setIsLoading(false);
      console.error("Erreur lors de la mise à jour du cours :", error);
      // Optionnel : afficher une notification d'erreur
    }
  };

  return (
    <div style={formStyle}>
      {!createdCourse ? (
        <>
          <h2>Créer un Nouveau Cours</h2>
          <label>Matière :</label>
          <select
            value={matiere}
            onChange={(e) => setMatiere(e.target.value)}
            style={inputStyle}
          >
            <option value="économie">Économie</option>
            <option value="sociologie">Sociologie</option>
            <option value="sciences-politiques">Sciences Politiques</option>
          </select>

          <label>Classe :</label>
          <select
            value={classe}
            onChange={(e) => setClasse(e.target.value)}
            style={inputStyle}
          >
            <option value="seconde">Seconde</option>
            <option value="première">Première</option>
            <option value="terminale">Terminale</option>
          </select>

          <label>Chapitre :</label>
          <input
            type="text"
            value={chapitre}
            onChange={(e) => setChapitre(e.target.value)}
            style={inputStyle}
          />

          <button onClick={handleSubmit} style={submitButtonStyle}>
            Valider
          </button>
        </>
      ) : (
        <>
          <EditCourseContent
            courseId={createdCourse.id}
            initialContent={createdCourse.contenu || ""}
            onSave={handleSaveContent}
            onGoBack={goBack}
            isLoading={isLoading}
          />
        </>
      )}
      {!createdCourse && (
        <button onClick={goBack} style={buttonStyle}>
          Retour
        </button>
      )}
    </div>
  );
};

const formStyle: React.CSSProperties = {
  marginTop: "20px",
  maxWidth: "500px",
  margin: "auto",
  textAlign: "left",
};
const inputStyle: React.CSSProperties = {
  padding: "10px",
  width: "100%",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  marginBottom: "10px",
};
const buttonStyle: React.CSSProperties = {
  padding: "10px 15px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "rgb(245, 185, 66)",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "15px",
  marginRight: "10px",
};
const submitButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: "green",
};

export default AddCourse;
