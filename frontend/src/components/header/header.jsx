import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import H1 from "../h1";
import Btn from "../btn";
import Nav from "../nav";
import icon from "../../../public/icon.svg";
import Search from "./search";

import styles from "./header.module.css";

function Header() {
  const navigate = useNavigate();
  const name = window.sessionStorage.getItem("name");

  function close() {
    window.sessionStorage.removeItem("token");
    navigate("/");
  }

  return (
    <header className={styles.header}>
      <div className={styles.h1LogoCerrar}>
        <img src={icon} alt="logo" />
        <H1 text="Wikiloc" controlClass={styles.h1}></H1>
        <div className={styles.cerrarh2}>
          <h2 className={styles.h2}>Hola: {name}</h2>
          <Btn
            click={close}
            text="Cerrar sesion"
            controlClass={styles.cerrar}
          ></Btn>
        </div>
      </div>

      <Search />

      <div className={styles.nav}>
        <Nav></Nav>
      </div>
    </header>
  );
}
export default Header;
