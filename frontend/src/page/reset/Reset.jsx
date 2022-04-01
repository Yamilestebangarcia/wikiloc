import { useState } from "react";
import { validationEmail } from "../../utility/validation.js";
import H1 from "../../components/h1.jsx";
import PError from "../../components/pError.jsx";
import ComponentLink from "../../components/link.jsx";
import Btn from "../../components/btn.jsx";
import InputComp from "../../components/InputComp";
function Reset() {
  function fetchData(data) {
    return fetch("http://localhost:3001/login/emailReset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        setLoading(false);
        if (!res.ok) {
          return res.json();
        } else {
          setShow(true);
        }
      })
      .then((res) => {
        if (res) {
          setErr(res.err);
        }
      })
      .catch((err) => {
        setEmail("");
        console.log(err);
      });
  }
  const [className, SetClassname] = useState(false);
  const [err, setErr] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleInputChange = (event) => {
    SetClassname(validationEmail(event.target.value));
    setEmail(event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validationEmail(email)) {
      setErr("email incorrecto");
    } else {
      fetchData({ email });
    }
  };

  return (
    <>
      <H1 text="Restaurar contraseña"></H1>

      {show ? (
        <div>
          <p>Revisa Tu correo</p>
          <p>si no lo encuntras mira en el spam</p>
        </div>
      ) : (
        <>
          <form>
            <InputComp
              className={className ? "correct" : "incorrect"}
              type="text"
              placeholder="Email"
              handlerChange={handleInputChange}
              name="email"
              value={email}
            ></InputComp>

            <Btn click={submit} text="Enviar"></Btn>
            <ComponentLink text="Logearse" url="/"></ComponentLink>
            <ComponentLink text="Registrase" url="/register"></ComponentLink>
          </form>
          <PError err={err}></PError>
          {loading ? <PError err="cargando"></PError> : null}
        </>
      )}
    </>
  );
}

export default Reset;
