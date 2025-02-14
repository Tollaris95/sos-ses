import React, { useState, CSSProperties } from "react";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import HomePage from "./pages/HomePage";
import Questionnaire from "./components/Questionnaire";
import AddContent from "./components/AddContent";
import Course from "./components/Course/Course";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    fontFamily: "Arial, sans-serif",
  } as CSSProperties,
  main: {
    textAlign: "center" as "center",
    flex: 1,
  } as CSSProperties,
};

const App: React.FC = () => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showLoginInputs, setShowLoginInputs] = useState(false);
  const [showAddContent, setShowAddContent] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [showCourses, setShowCourses] = useState(false);

  const handleNavClick = (buttonName: string) => {
    console.log("Bouton cliqué :", buttonName);
    setShowLoginInputs(false);
    setShowQuestion(buttonName === "Quizz");
    setShowConfirmation(false);
    setShowAddContent(buttonName === "Ajout de contenu");
    setShowCourses(buttonName === "Cours");
    setActiveButton(buttonName);
  };

  const handleReturnHome = () => {
    setShowQuestion(false);
    setShowConfirmation(false);
    setShowAddContent(false);
    setActiveButton(null);
  };

  return (
    <div style={styles.container}>
      {/* Le Header est toujours visible */}
      <Header
        onNavClick={handleNavClick}
        activeButton={activeButton}
        onLoginToggle={() => setShowLoginInputs(true)}
      />
      <div style={styles.main}>
        {showLoginInputs ? (
          <LoginForm />
        ) : showAddContent ? (
          <AddContent />
        ) : showCourses ? (
          <Course />
        ) : showQuestion ? (
          showConfirmation ? (
            <div>
              <h1>Ouiii je veux mon bisous</h1>
              <button onClick={handleReturnHome}>Accueil</button>
            </div>
          ) : (
            <Questionnaire
              onAnswer={(isCorrect) => setShowConfirmation(isCorrect)}
            />
          )
        ) : (
          <HomePage />
        )}
      </div>
      ;
    </div>
  );
};

export default App;
