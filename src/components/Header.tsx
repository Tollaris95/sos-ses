import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore"; // Import du store Zustand

interface HeaderProps {
  onNavClick: (name: string) => void;
  activeButton: string | null;
  onLoginToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavClick, activeButton, onLoginToggle }) => {
  const { user, logout } = useAuthStore(); // Récupérer l'utilisateur connecté depuis Zustand
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navItems = ["Accueil", "Cours", "Quizz", "Autour du bac", "Aller plus loin"];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const backgroundColor = "rgb(245, 185, 66)"; // Fond du header
  const selectedColor = "rgb(245, 117, 66)"; // Couleur des éléments actifs
  const defaultColor = "black"; // Couleur des éléments non actifs

  if (isMobile) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "15px",
        borderBottom: "2px solid #ccc",
        backgroundColor,
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        position: "relative"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px"
        }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>SOS SES</span>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "1.5rem",
            padding: "10px"
          }}>
            ☰
          </button>
        </div>
        {isMenuOpen && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", marginTop: "10px" }}>
            {navItems.map((item) => (
              <button
                key={item}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  fontWeight: activeButton === item ? "bold" : "normal",
                  padding: "10px",
                  transition: "color 0.3s ease",
                  color: activeButton === item ? selectedColor : defaultColor
                }}
                onClick={() => {
                  onNavClick(item);
                  setIsMenuOpen(false);
                }}
              >
                {item}
              </button>
            ))}

            {/* Si l'utilisateur est connecté, on affiche "Création d'exercice" au lieu de "Connexion" */}
            {user ? (
              <>
                <button
                  onClick={() => {
                    onNavClick("Création d'exercice");
                    setIsMenuOpen(false);
                  }}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    fontWeight: activeButton === "Création d'exercice" ? "bold" : "normal",
                    padding: "10px",
                    transition: "color 0.3s ease",
                    color: activeButton === "Création d'exercice" ? selectedColor : defaultColor
                  }}
                >
                  Création d'exercice
                </button>
                <button
                  onClick={logout}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    fontWeight: "normal",
                    padding: "10px",
                    transition: "color 0.3s ease",
                    color: "red"
                  }}
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onLoginToggle();
                  setIsMenuOpen(false);
                }}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  fontWeight: activeButton === "Connexion" ? "bold" : "normal",
                  padding: "10px",
                  transition: "color 0.3s ease",
                  color: activeButton === "Connexion" ? selectedColor : defaultColor
                }}
              >
                Connexion
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "15px",
      borderBottom: "2px solid #ccc",
      backgroundColor,
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
            color: activeButton === item ? selectedColor : defaultColor 
          }}
          onClick={() => onNavClick(item)}
          onMouseEnter={(e) => e.currentTarget.style.color = selectedColor}
          onMouseLeave={(e) => e.currentTarget.style.color = activeButton === item ? selectedColor : defaultColor}
        >
          {item}
          <span style={{ 
            display: "block", 
            height: "3px", 
            width: activeButton === item ? "100%" : "0%", 
            background: activeButton === item ? selectedColor : "transparent", 
            transition: "width 0.3s ease-in-out", 
            position: "absolute", 
            bottom: "-5px", 
            left: "0" 
          }} />
        </button>
      ))}

      {/* Si l'utilisateur est connecté, on affiche "Création d'exercice" et "Déconnexion", sinon "Connexion" */}
      {user ? (
        <>
          <button
            onClick={() => onNavClick("Création d'exercice")}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: activeButton === "Création d'exercice" ? "bold" : "normal",
              padding: "10px 15px",
              transition: "color 0.3s ease",
              color: activeButton === "Création d'exercice" ? selectedColor : defaultColor
            }}
          >
            Création d'exercice
          </button>
          <button
            onClick={logout}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "1rem",
              padding: "10px 15px",
              transition: "color 0.3s ease",
              color: "red"
            }}
          >
            Déconnexion
          </button>
        </>
      ) : (
        <button
          onClick={onLoginToggle}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "1rem",
            padding: "10px 15px",
            transition: "color 0.3s ease",
            color: activeButton === "Connexion" ? selectedColor : defaultColor
          }}
        >
          Connexion
        </button>
      )}
    </div>
  );
};

export default Header;
