import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { login } from "../services/login";
import { verifyToken } from "../services/jwtHelper";
import { useAuthStore } from "../store/authStore"; 

const LoginForm: React.FC = () => {
  const { user, login: storeLogin, token } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Vérification du token stocké
  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        const isValid = await verifyToken(token);
        if (!isValid) {
          useAuthStore.getState().logout(); // Déconnexion si le token est invalide
        }
      }
    };
    checkToken();
  }, [token]);

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await login(username, password);
      console.log("Connexion réussie :", data);

      // Stocker le token et l'utilisateur dans Zustand
      storeLogin(data.token, { username });

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

  // Redirection si déjà connecté
  if (user) {
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
          Vous êtes déjà connecté en tant que {user.username}.
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
