import React, { useState } from "react";

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  loginError: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, loginError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <input type="text" placeholder="Identifiant" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => onLogin(username, password)}>Se connecter</button>
      {loginError && <p style={{ color: "red" }}>Identifiant ou mot de passe incorrect</p>}
    </div>
  );
};

export default LoginForm;
