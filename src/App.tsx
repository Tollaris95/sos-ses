import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  const handleButtonClick = () => {
    setShowQuestion(true);
  };

  const handleAnswerClick = (isCorrect: boolean) => {
    setSelectedAnswer(isCorrect);
  };

  return (
    <div className="background">
      {!showQuestion ? (
        <button className="exercise-button" onClick={handleButtonClick}>
          Exercice
        </button>
      ) : (
        <div className="question-container">
          <h1 className="question-text">As tu le meilleur amoureux du monde ?</h1>
          <div className="answers">
            <button
              className={`answer-button ${selectedAnswer === false ? 'wrong' : ''}`}
              onClick={() => handleAnswerClick(false)}
            >
              Non
            </button>
            <button
              className={`answer-button ${selectedAnswer === false ? 'wrong' : ''}`}
              onClick={() => handleAnswerClick(false)}
            >
              Oui
            </button>
            <button
              className={`answer-button ${selectedAnswer === true ? 'correct' : ''}`}
              onClick={() => handleAnswerClick(true)}
            >
              Oui et je vais lui faire le plus gros des bisous
            </button>
            <button
              className={`answer-button ${selectedAnswer === false ? 'wrong' : ''}`}
              onClick={() => handleAnswerClick(false)}
            >
              Non je vais le quitter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
