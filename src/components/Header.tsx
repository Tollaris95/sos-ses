import React from "react";

interface HeaderProps {
  isLoggedIn: boolean;
  onNavClick: (name: string) => void;
  activeButton: string | null;
  onLoginToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onNavClick, activeButton, onLoginToggle }) => {
  const navItems = ["Accueil", "Cours", "Quizz", "Autour du bac", "Aller plus loin"];

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "15px",
      borderBottom: "2px solid #ccc",
      backgroundColor: "#f8f9fa",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
    }}>
      <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>SOS SES</span>
      {navItems.map((item) => (
        <button
          key={item}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: activeButton === item ? "bold" : "normal",
            position: "relative",
            padding: "10px 15px",
            transition: "color 0.3s ease",
            color: activeButton === item ? "#007BFF" : "black"
          }}
          onClick={() => onNavClick(item)}
          onMouseEnter={(e) => e.currentTarget.style.color = "#007BFF"}
          onMouseLeave={(e) => e.currentTarget.style.color = activeButton === item ? "#007BFF" : "black"}
        >
          {item}
          <span
            style={{
              display: "block",
              height: "3px",
              width: activeButton === item ? "100%" : "0%",
              background: "#007BFF",
              transition: "width 0.3s ease-in-out",
              position: "absolute",
              bottom: "-5px",
              left: "0"
            }}
          />
        </button>
      ))}
      {isLoggedIn ? (
        <button 
          onClick={() => onNavClick("Création d'exercice")} 
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: activeButton === "Création d'exercice" ? "bold" : "normal",
            position: "relative",
            padding: "10px 15px",
            transition: "color 0.3s ease",
            color: activeButton === "Création d'exercice" ? "#007BFF" : "black"
          }}
        >
          Création d'exercice
        </button>
      ) : (
        <button 
          onClick={onLoginToggle} 
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: activeButton === "Connexion" ? "bold" : "normal",
            position: "relative",
            padding: "10px 15px",
            transition: "color 0.3s ease",
            color: activeButton === "Connexion" ? "#007BFF" : "black"
          }}
        >
          Connexion
        </button>
      )}
    </div>
  );
};

export default Header;
