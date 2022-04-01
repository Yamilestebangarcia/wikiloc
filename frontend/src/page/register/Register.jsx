import { useState } from "react";
import Btn from "../../components/btn.jsx";
import H1 from "../../components/h1.jsx";

import ComponentLink from "../../components/link.jsx";
import PError from "../../components/pError.jsx";
import {
  validationEmail,
  validationPass,
  validationName,
} from "../../utility/validation.js";
import InputComp from "../../components/InputComp";

function Register() {
  const [className, SetClassname] = useState({
    email: false,
    pass1: false,
    pass2: false,
    name: false,
  });
  const [err, setErr] = useState();
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({
    email: "",
    pass1: "",
    pass2: "",
    name: "",
  });

  const handleInputChange = (event) => {
    if (event.target.name === "email") {
      SetClassname({
        ...className,
        email: validationEmail(event.target.value),
      });
    }
    if (event.target.name === "pass1") {
      SetClassname({ ...className, pass1: validationPass(event.target.value) });
    }
    if (event.target.name === "pass2") {
      SetClassname({
        ...className,
        pass2:
          validationPass(event.target.value) &&
          data.pass1 === event.target.value,
      });
    }
    if (event.target.name === "name") {
      SetClassname({ ...className, name: validationName(event.target.value) });
    }
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const submitData = (event) => {
    event.preventDefault();
    if (
      !validationEmail(data.email) ||
      !validationPass(data.pass1) ||
      !validationPass(data.pass2) ||
      !validationName(data.name)
    ) {
      setErr("Nombre,email o password incorrecto");
    } else {
      if (data.pass1 !== data.pass2) {
        setErr("los password no coinciden");
      } else {
        fetchData({ email: data.email, pass: data.pass1, name: data.name });
      }
    }
  };

  function fetchData(data) {
    console.log(data);
    return fetch("http://localhost:3001/login/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status !== 201) {
          return res.json();
        } else {
          setSuccess(true);
        }
      })
      .then((res) => {
        if (res !== undefined) {
          setErr(res.err);
          setData({
            email: "",
            pass1: "",
            pass2: "",
            name: "",
          });
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <H1 text="Register"></H1>
      <form>
        <InputComp
          className={className.email ? "correct" : "incorrect"}
          type="text"
          placeholder="Email"
          handlerChange={handleInputChange}
          name="email"
          value={data.email}
        ></InputComp>
        <InputComp
          className={className.pass1 ? "correct" : "incorrect"}
          type="password"
          placeholder="Contraseña"
          handlerChange={handleInputChange}
          name="pass1"
          value={data.pass1}
        ></InputComp>

        <InputComp
          className={className.pass2 ? "correct" : "incorrect"}
          type="password"
          placeholder="Contraseña"
          handlerChange={handleInputChange}
          name="pass2"
          value={data.pass2}
        ></InputComp>

        <InputComp
          className={className.name ? "correct" : "incorrect"}
          type="text"
          placeholder="Nombre"
          handlerChange={handleInputChange}
          name="name"
          value={data.name}
        ></InputComp>

        <Btn text="enviar" click={submitData}></Btn>
        <ComponentLink text="¿Logueate?" url="/"></ComponentLink>
        <ComponentLink
          text="¿Olvidaste contraseña?"
          url="/reset"
        ></ComponentLink>
      </form>
      {success ? (
        <>
          <PError
            err={
              "Registrado correctamente, se ha enviado un correo para que valides tu email"
            }
          ></PError>
          <ComponentLink url="/" text="Loguearse"></ComponentLink>
        </>
      ) : null}
      <PError err={err}></PError>
    </>
  );
}

export default Register;
