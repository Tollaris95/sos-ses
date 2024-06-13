import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleButtonClick = () => {
    setShowQuestion(true);
    setShowConfirmation(false);
    setSelectedAnswer(null);
    setIncorrectAnswers([]);
  };

  const handleAnswerClick = (isCorrect: boolean, index: number) => {
    setSelectedAnswer(isCorrect);
    if (!isCorrect) {
      setIncorrectAnswers([...incorrectAnswers, index]);
    } else {
      setShowConfirmation(true);
    }
  };

  return (
    <div className="background">
      {!showQuestion ? (
        <button className="exercise-button" onClick={handleButtonClick}>
          Exercice
        </button>
      ) : showConfirmation ? (
        <div className="confirmation-container">
          <h1 className="confirmation-text">Félicitations! C'est la bonne réponse.</h1>
          <button className="exercise-button" onClick={handleButtonClick}>
            Recommencer
          </button>
        </div>
      ) : (
        <div className="question-container">
          <h1 className="question-text">As tu le meilleur amoureux du monde ?</h1>
          <div className="answers">
            {['Non', 'Oui', 'Oui et je vais lui faire le plus gros des bisous', 'Non je vais le quitter'].map((answer, index) => (
              <button
                key={index}
                className={`answer-button ${incorrectAnswers.includes(index) ? 'wrong' : ''}`}
                onClick={() => handleAnswerClick(answer === 'Oui et je vais lui faire le plus gros des bisous', index)}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
