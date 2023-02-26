import styles from "./NavBar.module.css";

import { useAuthContext } from "../../contexts/authContext";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoCloseSharp } from "react-icons/io5";

import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useRemoveLocalStorage } from "../../hooks/useLocalStorage";

const NavBar = () => {
  const [isMobile, setIsmobile] = useState(false);
  const navigate = useNavigate();

  // Pegando  context do usuário e estado dele:
  const { auth, setAuth } = useAuthContext();

  // Deslogando o usuário e apagando o localStorage ao clicar em sair:
  const handleLogout = () => {
    setAuth(false);
    useRemoveLocalStorage();

    navigate("/login");
    setIsmobile(!isMobile);
  };
  return (
    <aside className={styles.aside}>
      <nav className={isMobile ? styles.isMobile : styles.closed}>
        <NavLink to="/">
          Auth<span>Context</span>
        </NavLink>
        <ul>
          {!auth && (
            <li>
              <NavLink to="/login" onClick={() => setIsmobile(!isMobile)}>
                Entrar
              </NavLink>
            </li>
          )}
          {auth && (
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
