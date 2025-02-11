import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { login } from "../services/login";
import { verifyToken, getToken } from "../services/jwtHelper"; // Import du helper JWT

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérification du token au chargement du composant
  useEffect(() => {
    const checkToken = async () => {
      const token = getToken();
      if (token) {
        const isValid = await verifyToken(token);
        if (isValid) {
          setIsAuthenticated(true);
          console.log("Utilisateur déjà authentifié");
        }
      }
    };
  
    checkToken();
  }, []);
  

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await login(username, password);
      console.log("Connexion réussie :", data);

      // Stocker le token
      localStorage.setItem("token", data.token);

      // Rafraîchir la page pour charger les infos utilisateur
      window.location.reload();
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleLogin();
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Si l'utilisateur est déjà authentifié, on peut le rediriger ou afficher un message
  if (isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h5" color="primary">
          Vous êtes déjà connecté.
        </Typography>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "90vh",
        paddingTop: "10vh",
        gap: "20px",
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        Connexion
      </Typography>

      <TextField
        label="Identifiant"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyPress}
        style={{ maxWidth: "350px" }}
        disabled={isLoading}
      />
      <TextField
        label="Mot de passe"
        variant="outlined"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyPress}
        style={{ maxWidth: "350px" }}
        disabled={isLoading}
      />

      {errorMessage && (
        <Typography color="error" fontSize="0.9rem">
          {errorMessage}
        </Typography>
      )}

      <Button
        variant="contained"
        fullWidth
        onClick={handleLogin}
        disabled={isLoading}
        sx={{
          backgroundColor: "rgb(245, 185, 66)",
          "&:hover": { backgroundColor: "rgb(245, 150, 50)" },
          maxWidth: "350px",
          padding: "12px",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Se connecter"
        )}
      </Button>
    </div>
  );
};

export default LoginForm;
