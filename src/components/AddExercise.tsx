import React from "react";

interface AddExerciseProps {
  goBack: () => void;
}

const AddExercise: React.FC<AddExerciseProps> = ({ goBack }) => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Création d'un Nouvel Exercice</h2>
      <p>Ici, tu pourras ajouter des exercices spécifiques.</p>

      <button onClick={goBack} style={buttonStyle}>Retour</button>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 15px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "rgb(245, 117, 66)",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "20px"
};

export default AddExercise;
