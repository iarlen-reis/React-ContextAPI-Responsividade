import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

import { isAuth } from "../../utils/isAuth";

// context

import { useAuthContext } from "../../contexts/authContext";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { user, setUser, authorization, setAuthorization } = useAuthContext();

  const userTry = {
    email,
    password,
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validando os inputs:

    if (password.length < 5) {
      setError("Por favor a senha deve ter ao menos 5 caracteres.");
      return;
    }

    if (!isAuth(email)) {
      setError("Por favor digite um e-mail válido.");
      return;
    }

    // Criando um localstorage com user: Email
    localStorage.setItem("user", userTry.email);
    // Criando um localstorage com estado do usuário: autorizado
    localStorage.setItem("logado", true);

    // Autorizando o usuário  a entrar no sistema.
    setAuthorization(localStorage.getItem("logado"));

    // Mandando o usuário para o home ao logar.
    navigate("/");
  };

  return (
    <section className={styles.section}>
      <section className={styles.login__content}>
        <header>
          <h1>Login</h1>
          <p>Realize login para continuar.</p>
        </header>
        <form onSubmit={handleSubmit}>
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
