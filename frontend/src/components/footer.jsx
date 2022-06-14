import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchDeleteUSer } from "../service/useFetch";
import Btn from "./btn";
import PError from "./pError";
import Spinner from "./spinner";
import PInfo from "./Info";
import styles from "./footer.module.css";

function Footer() {
  //navegate
  const navigate = useNavigate();

  //state
  const [err, setErr] = useState();
  const [loading, setLoading] = useState(false);
  const [remove, setRemuve] = useState(false);

  //Elimino el token y redirijo
  function close() {
    window.sessionStorage.removeItem("token");
    navigate("/");
  }
  //borra usuario
  function deleteUser() {
    const token = window.sessionStorage.getItem("token");
    setLoading(true);

    if (!token || token === "undefined" || token === "null") {
      return close();
    }

    useFetchDeleteUSer(
      "http://localhost:3001/login/deleteEmail",
      { token },
      setLoading,
      setErr
    ).then((res) => {
      if (res) {
        window.sessionStorage.setItem("token", null);
        setRemuve("Se ha mandado un correo a tu email");
      }
    });
  }

  return (
    <>
      <Spinner controlClass={loading} />
      <footer className={styles.footer}>
        <div className={styles.info}>
          <p className={styles.copy}>© 2021 Yamil Esteban Garcia</p>
          <Btn
            click={deleteUser}
            text="Eliminar Usuario"
            controlClass={styles.cerrar}
          ></Btn>
          <PInfo info={remove} ControlClass={true}></PInfo>

          <PError err={err} controlClass={true}></PError>
        </div>
      </footer>
    </>
  );
}
export default Footer;
