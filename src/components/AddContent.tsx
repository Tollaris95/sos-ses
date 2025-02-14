import React, { useState } from "react";
import AddCourse from "./Course/AddCourse"; // Import du composant pour les cours
import AddExercise from "./AddExercise"; // Import du composant pour les exercices

const AddContent: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Ajout de Contenu</h1>
      {!selectedOption ? (
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
          <button onClick={() => setSelectedOption("course")} style={buttonStyle}>
            Nouveau Cours
          </button>
          <button onClick={() => setSelectedOption("exercise")} style={buttonStyle}>
            Nouvel Exercice
          </button>
        </div>
      ) : selectedOption === "course" ? (
        <AddCourse goBack={() => setSelectedOption(null)} />
      ) : (
        <AddExercise goBack={() => setSelectedOption(null)} />
      )}
    </div>
  );
};

// Style des boutons
const buttonStyle = {
  padding: "10px 20px",
  fontSize: "1rem",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  backgroundColor: "rgb(245, 185, 66)",
  color: "white",
  fontWeight: "bold",
};

export default AddContent;
