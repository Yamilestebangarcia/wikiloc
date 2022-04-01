import Btn from "./btn";
import PError from "./pError";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  function close() {
    window.sessionStorage.removeItem("token");
    navigate("/");
  }
  function deleteUser() {
    const token = window.sessionStorage.getItem("token");
    setLoading(true);

    console.log(token === "null");
    if (!token || token === "undefined" || token === "null") {
      return close();
    }
    fetch("http://localhost:3001/login/deleteEmail", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        setLoading(false);
        if (res.status !== 200) {
          return res.json();
        } else {
          window.sessionStorage.setItem("token", null);
          setRemuve(true);
        }
      })
      .then((res) => {
        if (res !== undefined) {
          setErr(res.err);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const [err, setErr] = useState();
  const [loading, setLoading] = useState(false);
  const [remove, setRemuve] = useState(false);

  return (
    <footer>
      <Btn click={deleteUser} text="Eliminar usuario"></Btn>
      {remove ? <p>Se ha mandado un correo a tu email </p> : null}
      <PError err={err}></PError>
      {loading ? <PError err="cargando"></PError> : null}
    </footer>
  );
}
export default Footer;
