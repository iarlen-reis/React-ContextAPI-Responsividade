import React, { useEffect } from "react";

import styles from "./Home.module.css";

import { useAuthContext } from "../../contexts/authContext";

const Home = () => {
  const { user } = useAuthContext();

  return (
    <section className={styles.section}>
      <header>
        <h2>Olá {user}, seja bem-vindo a home!</h2>
        <p>Essa é a home da aplicação</p>
      </header>
    </section>
  );
};

export default Home;
