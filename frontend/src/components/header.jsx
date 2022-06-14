import H1 from "./h1";
import InputComp from "./InputComp";
import Btn from "./btn";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Nav from "./nav";
import styles from "./header.module.css";
import icon from "../../public/icon.svg";

function Header() {
  const navigate = useNavigate();
  const name = window.sessionStorage.getItem("name");
  const [search, setSearch] = useState("");

  function close() {
    window.sessionStorage.removeItem("token");
    navigate("/");
  }

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };
  const presskey = (e) => {
    if (e.key === "Enter") {
      searchRute();
    }
  };
  const searchRute = () => {
    navigate(`/app/search/?search=${search}`);
  };

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
      <div className={styles.search}>
        <InputComp
          type="search"
          placeholder="Buscar Ruta"
          handlerChange={handleInputChange}
          name="search"
          controlClass={styles.inputSearch}
          value={search}
          presskey={presskey}
        ></InputComp>
        <Btn click={searchRute} text="Buscar"></Btn>
      </div>
      <div className={styles.nav}>
        <Nav></Nav>
      </div>
    </header>
  );
}
export default Header;
