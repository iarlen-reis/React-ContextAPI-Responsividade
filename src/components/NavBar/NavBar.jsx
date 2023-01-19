import React from "react";
import { NavLink } from "react-router-dom";

import { useAuthContext } from "../../contexts/authContext";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoCloseSharp } from "react-icons/io5";
import styles from "./NavBar.module.css";
import { useState } from "react";

const NavBar = () => {
  const [isMobile, setIsmobile] = useState(false);

  // Pegando  context do usuário e estado dele:
  const { user, setAuthorization } = useAuthContext();

  // Removendo usuário e estado do localstorage ao clicar em sair:
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("logado");
    setAuthorization(localStorage.getItem("logado"));

    setIsmobile(!isMobile);
  };

  return (
    <aside className={styles.aside}>
      <nav className={isMobile ? styles.isMobile : styles.closed}>
        <NavLink to="/">
          Auth<span>Context</span>
        </NavLink>
        <ul>
          {!user && (
            <li>
              <NavLink to="/login" onClick={() => setIsmobile(!isMobile)}>
                Entrar
              </NavLink>
            </li>
          )}
          {user && (
            <li>
              <button onClick={handleLogout}>Sair</button>
            </li>
          )}
        </ul>
        <div className={`${styles.menu__mobile} ${isMobile && "isMobile"}`}>
          {!isMobile ? (
            <CgMenuRightAlt
              size={45}
              color="#FFF"
              onClick={() => setIsmobile(!isMobile)}
            />
          ) : (
            <IoCloseSharp
              size={45}
              color="#FFF"
              onClick={() => setIsmobile(!isMobile)}
            />
          )}
        </div>
      </nav>
    </aside>
  );
};

export default NavBar;
