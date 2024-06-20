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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [newAnswers, setNewAnswers] = useState<string[]>(["", "", "", ""]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(0);
  const [creatingExercise, setCreatingExercise] = useState<boolean>(false);

  const handleButtonClick = () => {
    setShowQuestion(true);
    setShowConfirmation(false);
    setIncorrectAnswers([]);
  };

  const handleButtonReturnHome = () => {
    setShowQuestion(false);
    setShowConfirmation(false);
    setIncorrectAnswers([]);
  };

  const handleAnswerClick = (isCorrect: boolean, index: number) => {
    if (!isCorrect) {
      setIncorrectAnswers([...incorrectAnswers, index]);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleLogin = () => {
    if (username === "kesiane" && password === "pissenlit") {
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLoginButtonClick = () => {
    setShowLoginInputs(!showLoginInputs);
  };

  const handleAddQuestion = () => {
    const newQuestions = [
      ...questions,
      {
        text: newQuestion,
        answers: newAnswers,
        correctIndex: correctAnswerIndex,
      },
    ];
    setQuestions(newQuestions);
    setCreatingExercise(false);
    setNewQuestion("");
    setNewAnswers(["", "", "", ""]);
    setCorrectAnswerIndex(0);
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
      backgroundColor: "#007BFF",
      color: "white",
      padding: "10px",
      textAlign: "center" as "center",
      fontSize: "24px",
    } as CSSProperties,
    sidebar: {
      position: "fixed" as "fixed",
      top: 0,
      left: 0,
      height: "100%",
      width: "200px",
      backgroundColor: "#343a40",
      padding: "10px",
      color: "white",
      display: "flex",
      flexDirection: "column" as "column",
    } as CSSProperties,
    main: {
      marginLeft: "200px",
      padding: "20px",
      flex: 1,
    } as CSSProperties,
    loginContainer: {
      display: "flex",
      flexDirection: "column" as "column",
      alignItems: "center",
      position: "absolute" as "absolute",
      top: "5px",
      right: "20px",
    } as CSSProperties,
    loginInput: {
      margin: "5px 0",
      padding: "10px",
      fontSize: "16px",
    } as CSSProperties,
    loginButton: {
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      backgroundColor: "white",
      color: "#007BFF",
      border: "none",
      borderRadius: "5px",
    } as CSSProperties,
    exerciseButton: {
      padding: "20px 40px",
      fontSize: "24px",
      cursor: "pointer",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "5px",
      margin: "10px 0",
    } as CSSProperties,
    confirmationContainer: {
      textAlign: "center" as "center",
    } as CSSProperties,
    confirmationText: {
      fontSize: "24px",
      marginBottom: "20px",
    } as CSSProperties,
    questionContainer: {
      textAlign: "center" as "center",
    } as CSSProperties,
    questionText: {
      fontSize: "24px",
      marginBottom: "20px",
    } as CSSProperties,
    answers: {
      display: "flex",
      flexDirection: "column" as "column",
      alignItems: "center",
    } as CSSProperties,
    answerButton: {
      padding: "10px 20px",
      fontSize: "18px",
      margin: "5px",
      cursor: "pointer",
    } as CSSProperties,
    wrong: {
      backgroundColor: "#dc3545",
      color: "white",
    } as CSSProperties,
    createExerciseContainer: {
      display: "flex",
      flexDirection: "column" as "column",
      alignItems: "center",
    } as CSSProperties,
    createExerciseInput: {
      margin: "5px 0",
      padding: "10px",
      fontSize: "16px",
      width: "80%",
    } as CSSProperties,
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>SOS SES
      <div style={styles.loginContainer}>
          {!isLoggedIn && (
            <button style={styles.loginButton} onClick={handleLoginButtonClick}>
              {showLoginInputs ? "Fermer" : "Connexion"}
            </button>
          )}
          {showLoginInputs && !isLoggedIn && (
            <>
              <input
                style={styles.loginInput}
                type="text"
                placeholder="Identifiant"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                style={styles.loginInput}
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button style={styles.loginButton} onClick={handleLogin}>
                Se connecter
              </button>
              {loginError && (
                <p style={{ color: "red" }}>
                  Identifiant ou mot de passe incorrect
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <div style={styles.sidebar}>
        <button style={styles.exerciseButton} onClick={handleButtonClick}>
          Exercice
        </button>
        {isLoggedIn && (
          <button
            style={styles.exerciseButton}
            onClick={() => setCreatingExercise(true)}
          >
            Création d'exercice
          </button>
        )}
      </div>
      <div style={styles.main}>
        {!showQuestion ? (
          <div style={styles.confirmationContainer}>
          <h1 style={styles.confirmationText}>
            Bienvenu sur sos ses le site dédier à la meilleur prof de la matière
          </h1>
        </div>
        ) : showConfirmation ? (
          <div style={styles.confirmationContainer}>
            <h1 style={styles.confirmationText}>
              Félicitations! C'est la bonne réponse.
            </h1>
            <button style={styles.exerciseButton} onClick={handleButtonClick}>
              Recommencer
            </button>
            <button style={styles.exerciseButton} onClick={handleButtonReturnHome}>
              Accueil
            </button>
          </div>
        ) : (
          <div style={styles.questionContainer}>
            <h1 style={styles.questionText}>
              As tu le meilleur amoureux du monde ?
            </h1>
            <div style={styles.answers}>
              {[
                "Non",
                "Oui",
                "Oui et je vais lui faire le plus gros des bisous",
                "Non je vais le quitter",
              ].map((answer, index) => (
                <button
                  key={index}
                  style={{
                    ...styles.answerButton,
                    ...(incorrectAnswers.includes(index) ? styles.wrong : {}),
                  }}
                  onClick={() =>
                    handleAnswerClick(
                      answer ===
                        "Oui et je vais lui faire le plus gros des bisous",
                      index
                    )
                  }
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        )}
        {isLoggedIn && (
          <div>
            {creatingExercise ? (
              <div style={styles.createExerciseContainer}>
                <h2>Créer une nouvelle question</h2>
                <input
                  style={styles.createExerciseInput}
                  type="text"
                  placeholder="Question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
                {newAnswers.map((answer, index) => (
                  <input
                    key={index}
                    style={styles.createExerciseInput}
                    type="text"
                    placeholder={`Réponse ${index + 1}`}
                    value={answer}
                    onChange={(e) => {
                      const updatedAnswers = [...newAnswers];
                      updatedAnswers[index] = e.target.value;
                      setNewAnswers(updatedAnswers);
                    }}
                  />
                ))}
                <select
                  style={styles.createExerciseInput}
                  value={correctAnswerIndex}
                  onChange={(e) =>
                    setCorrectAnswerIndex(Number(e.target.value))
                  }
                >
                  {newAnswers.map((_, index) => (
                    <option key={index} value={index}>
                      Réponse {index + 1}
                    </option>
                  ))}
                </select>
                <button style={styles.loginButton} onClick={handleAddQuestion}>
                  Ajouter la question
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
