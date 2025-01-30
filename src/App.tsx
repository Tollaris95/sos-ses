import React, { useState, CSSProperties } from "react";

interface Question {
  text: string;
  answers: string[];
  correctIndex: number;
}

const App: React.FC = () => {
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLoginInputs, setShowLoginInputs] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<boolean>(false);
  const [creatingExercise, setCreatingExercise] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (buttonName: string) => {
    setShowQuestion(true);
    setShowConfirmation(false);
    setIncorrectAnswers([]);
    setActiveButton(buttonName); // Définir le bouton actif
  };

  const handleReturnHome = () => {
    setShowQuestion(false);
    setShowConfirmation(false);
    setIncorrectAnswers([]);
    setActiveButton(null); // Réinitialiser le bouton actif
  };

  const handleLogin = () => {
    if (username === "kesiane" && password === "pissenlit") {
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as "column",
      height: "100vh",
      backgroundColor: "#f0f0f0",
      fontFamily: "Arial, sans-serif",
    } as CSSProperties,
    header: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "15px",
      fontSize: "20px",
      borderBottom: "1px solid #ccc", // Ligne de séparation sous le header
    } as CSSProperties,
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      backgroundColor: "transparent",
      color: "#007BFF", // Couleur du texte
      border: "none", // Pas de bordure
      textDecoration: "none", // Pas de soulignement par défaut
      transition: "text-decoration 0.3s", // Transition pour le soulignement
    } as CSSProperties,
    buttonHover: {
      textDecoration: "underline", // Soulignement au survol
    } as CSSProperties,
    buttonActive: {
      textDecoration: "underline", // Soulignement actif après le clic
    } as CSSProperties,
    main: {
      padding: "20px",
      textAlign: "center" as "center",
    } as CSSProperties,
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span>SOS SES</span>
        <button
          style={{
            ...styles.button,
            ...(activeButton === "Accueil" && styles.buttonActive),
          }}
          onClick={handleReturnHome}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => {
            if (activeButton !== "Accueil") {
              e.currentTarget.style.textDecoration = "none";
            }
          }}
        >
          Accueil
        </button>
        <button
          style={{
            ...styles.button,
            ...(activeButton === "Cours" && styles.buttonActive),
          }}
          onClick={() => handleButtonClick("Cours")}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => {
            if (activeButton !== "Cours") {
              e.currentTarget.style.textDecoration = "none";
            }
          }}
        >
          Cours
        </button>
        <button
          style={{
            ...styles.button,
            ...(activeButton === "Quizz" && styles.buttonActive),
          }}
          onClick={() => handleButtonClick("Quizz")}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => {
            if (activeButton !== "Quizz") {
              e.currentTarget.style.textDecoration = "none";
            }
          }}
        >
          Quizz
        </button>
        <button
          style={{
            ...styles.button,
            ...(activeButton === "Autour du bac" && styles.buttonActive),
          }}
          onClick={() => handleButtonClick("Autour du bac")}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => {
            if (activeButton !== "Autour du bac") {
              e.currentTarget.style.textDecoration = "none";
            }
          }}
        >
          Autour du bac
        </button>
        <button
          style={{
            ...styles.button,
            ...(activeButton === "Aller plus loin" && styles.buttonActive),
          }}
          onClick={() => handleButtonClick("Aller plus loin")}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => {
            if (activeButton !== "Aller plus loin") {
              e.currentTarget.style.textDecoration = "none";
            }
          }}
        >
          Aller plus loin
        </button>
        {isLoggedIn && (
          <button
            style={{
              ...styles.button,
              ...(activeButton === "Création d'exercice" && styles.buttonActive),
            }}
            onClick={() => {
              setCreatingExercise(true);
              setActiveButton("Création d'exercice");
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => {
              if (activeButton !== "Création d'exercice") {
                e.currentTarget.style.textDecoration = "none";
              }
            }}
          >
            Création d'exercice
          </button>
        )}
        {!isLoggedIn && (
          <button
            style={{
              ...styles.button,
              ...(activeButton === "Connexion" && styles.buttonActive),
            }}
            onClick={() => {
              setShowLoginInputs(!showLoginInputs);
              setActiveButton("Connexion");
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => {
              if (activeButton !== "Connexion") {
                e.currentTarget.style.textDecoration = "none";
              }
            }}
          >
            {showLoginInputs ? "Fermer" : "Connexion"}
          </button>
        )}
      </div>

      <div style={styles.main}>
        {!showQuestion ? (
          <h1>Bienvenue sur SOS SES, le site dédié à la meilleure prof de la matière !</h1>
        ) : showConfirmation ? (
          <div>
            <h1>Félicitations ! C'est la bonne réponse.</h1>
            <button style={styles.button} onClick={handleReturnHome}>Accueil</button>
          </div>
        ) : (
          <div>
            <h1>As-tu le meilleur amoureux du monde ?</h1>
            {["Non", "Oui", "Oui et je vais lui faire le plus gros des bisous", "Non je vais le quitter"].map((answer, index) => (
              <button
                key={index}
                style={styles.button}
                onClick={() => setShowConfirmation(answer === "Oui et je vais lui faire le plus gros des bisous")}
              >
                {answer}
              </button>
            ))}
          </div>
        )}

        {showLoginInputs && !isLoggedIn && (
          <div>
            <input type="text" placeholder="Identifiant" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button style={styles.button} onClick={handleLogin}>Se connecter</button>
            {loginError && <p style={{ color: "red" }}>Identifiant ou mot de passe incorrect</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;