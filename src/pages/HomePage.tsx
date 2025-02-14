import React from "react";
import sosImage from "../assets/ses.jpeg";  // Image de fond
import gifAnimation from "../assets/tenor.gif"; // GIF

const HomePage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // S'assure que l'écran est rempli
        width: "100vw",  // Empêche tout débordement horizontal
        margin: "0",
        padding: "0",
        overflow: "hidden", // Empêche le scroll down
        backgroundImage: `url(${sosImage})`,
        backgroundSize: "100% 100%", // Étire pour s'adapter parfaitement
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Titre, positionné plus haut */}
      <h1 style={{ 
        color: "rgb(0, 0, 0)", // Ta couleur d'origine
        fontSize: "2rem", 
        textShadow: "2px 2px 4px rgb(245, 185, 66)",
        padding: "10px",
        margin: "0",
        textAlign: "center",
        position: "absolute",
        top: "30%", // Remonte le texte
      }}>
        Bienvenue sur SOS SES.
        <br></br>
        Le site qui te viens en aide pour réviser la meilleure des matières
      </h1>

      {/* GIF ajusté dynamiquement */}
      <img
        src={gifAnimation}
        alt="Animation"
        style={{ 
          marginTop: "10vh", // Ajuste l'espacement sous le titre
          width: "60vw", // Prend 60% de la largeur de l'écran
          maxWidth: "500px", // Taille max sur grand écran
          height: "auto",
        }} 
      />
    </div>
  );
};

export default HomePage;
