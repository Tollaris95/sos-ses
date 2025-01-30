import React, { useState } from "react";

interface QuestionnaireProps {
  onAnswer: (isCorrect: boolean) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerClick = (answer: string) => {
    const isCorrect = answer === "Oui et je vais lui faire le plus gros des bisous";
    setSelectedAnswer(answer);
    setTimeout(() => onAnswer(isCorrect), 1000); // Délai pour afficher la couleur avant de passer à l'étape suivante
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
      backgroundColor: "#ffffff",
      borderRadius: "15px",
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
      maxWidth: "500px",
      margin: "auto",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333", marginBottom: "30px" }}>
        As-tu le meilleur amoureux du monde ?
      </h1>
      {["Non", "Oui", "Oui et je vais lui faire le plus gros des bisous", "Non je vais le quitter"].map((answer) => {
        const isCorrect = answer === "Oui et je vais lui faire le plus gros des bisous";
        return (
          <button
            key={answer}
            onClick={() => handleAnswerClick(answer)}
            style={{
              width: "100%",
              padding: "15px",
              margin: "10px 0",
              fontSize: "1.2rem",
              fontWeight: "bold",
              border: "2px solid #ccc",
              borderRadius: "8px",
              backgroundColor: selectedAnswer === answer ? (isCorrect ? "#4CAF50" : "#ff4d4d") : "#fff",
              color: selectedAnswer === answer ? "#fff" : "#333",
              cursor: "pointer",
              transition: "background-color 0.3s, color 0.3s, transform 0.2s",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transform: selectedAnswer === answer ? "scale(1.05)" : "scale(1)"
            }}
          >
            {answer}
          </button>
        );
      })}
    </div>
  );
};

export default Questionnaire;