import React, { useState, CSSProperties } from "react";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import HomePage from "./pages/HomePage";
import Questionnaire from "./components/Questionnaire";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    minHeight: "100vh",
    backgroundColor: "#f0f0f0",
    fontFamily: "Arial, sans-serif",
  } as CSSProperties,
  main: {
    padding: "20px",
    textAlign: "center" as "center",
    flex: 1,
  } as CSSProperties,
};

const App: React.FC = () => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginInputs, setShowLoginInputs] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleNavClick = (buttonName: string) => {
    setShowQuestion(buttonName === "Quizz");
    setShowConfirmation(false);
    setActiveButton(buttonName);
  };

  const handleReturnHome = () => {
    setShowQuestion(false);
    setShowConfirmation(false);
    setActiveButton(null);
  };

  const handleLogin = (username: string, password: string) => {
    if (username === "kesiane" && password === "pissenlit") {
      setIsLoggedIn(true);
      setLoginError(false);
      setShowLoginInputs(false);
    } else {
      setLoginError(true);
    }
  };

  return (
    <div style={styles.container}>
      <Header isLoggedIn={isLoggedIn} onNavClick={handleNavClick} activeButton={activeButton} onLoginToggle={() => setShowLoginInputs(!showLoginInputs)} />
      <div style={styles.main}>
        {!showQuestion ? (
          <HomePage />
        ) : showConfirmation ? (
          <div>
            <h1>Ouiii je veux mon bisous</h1>
            <button onClick={handleReturnHome}>Accueil</button>
          </div>
        ) : (
          <Questionnaire onAnswer={(isCorrect) => setShowConfirmation(isCorrect)} />
        )}
        {showLoginInputs && !isLoggedIn && <LoginForm onLogin={handleLogin} loginError={loginError} />}
      </div>
    </div>
  );
};

export default App;
