import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

import { isAuth } from "../../utils/isAuth";

// context
import { useAuthContext } from "../../contexts/authContext";
import { useEffect } from "react";

// auth
import { useSaveLocalStorage } from "../../hooks/useLocalStorage";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { userEmail, setEmailUser, username, setUsername } = useAuthContext();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validando os inputs:
    if (!name || name.length < 3) {
      setError("Digite um nome válido");
      return;
    }

    if (password.length < 5) {
      setError("Por favor a senha deve ter ao menos 5 caracteres.");
      return;
    }

    if (!isAuth(email)) {
      setError("Por favor digite um e-mail válido.");
      return;
    }
    // Salvando o usuário no localStorage e logando ele
    useSaveLocalStorage(email, name, true);
    setEmailUser(email);
    setUsername(name);
  };

  // verificando o se o usuário está logado:
  useEffect(() => {
    if (userEmail) {
      navigate("/");
    }
  }, [userEmail]);

  return (
    <section className={styles.section}>
      <section className={styles.login__content}>
        <header>
          <h1>Login</h1>
          <p>Realize login para continuar.</p>
        </header>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Usuário:</span>
            <input
              type="text"
              name="username"
              value={name}
              onChange={({ target }) => setName(target.value)}
              autoComplete="off"
              className={styles.inputs}
            />
          </label>
          <label>
            <span>E-mail:</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              autoComplete="off"
              className={styles.inputs}
            />
          </label>
          <label>
            <span>Senha:</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={({ target }) => setPassowrd(target.value)}
              autoComplete="off"
              className={styles.inputs}
            />
          </label>
          <button type="submit">Entrar</button>
          <div className={styles.error}>{error && <p>{error}</p>}</div>
        </form>
      </section>
    </section>
  );
};

export default Login;
