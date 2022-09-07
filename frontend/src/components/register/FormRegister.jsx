import { useCallback, useEffect, useState } from "react";
import {
  validationEmail,
  validationPass,
  validationName,
} from "../../utility/validation";
import { useFetchRegister } from "../../service/useFetch";
import InputComp from "../InputComp";
import Btn from "../btn";
import PError from "../pError";

import styles from "../formLogin.module.css";

function FormRegister({ setLoading }) {
  //states
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
  const [submit, setSubmit] = useState([]);
  //handle state and validation
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

  useEffect(() => {
    if (data.email !== "") {
      setErr(null);
      setLoading(true);
      if (
        !validationEmail(data.email) ||
        !validationPass(data.pass1) ||
        !validationPass(data.pass2) ||
        !validationName(data.name)
      ) {
        setErr("Nombre,email o password incorrecto");
        setLoading(false);
      } else {
        if (data.pass1 !== data.pass2) {
          setErr("los password no coinciden");
          setLoading(false);
        } else {
          useFetchRegister(
            "http://localhost:3001/login/register",
            { email: data.email, pass: data.pass1, name: data.name },
            setLoading,
            setErr
          ).then((res) => {
            if (res) {
              setSuccess(true);
            }
            setData({
              email: "",
              pass1: "",
              pass2: "",
              name: "",
            });
          });
        }
      }
    }
  }, [submit]);

  return (
    <form className={styles.form}>
      <InputComp
        controlClass={className.email}
        type="text"
        placeholder="Email"
        handlerChange={handleInputChange}
        name="email"
        value={data.email}
      ></InputComp>
      <InputComp
        controlClass={className.pass1}
        type="password"
        placeholder="Contraseña"
        handlerChange={handleInputChange}
        name="pass1"
        value={data.pass1}
      ></InputComp>

      <InputComp
        controlClass={className.pass2}
        type="password"
        placeholder="Contraseña"
        handlerChange={handleInputChange}
        name="pass2"
        value={data.pass2}
      ></InputComp>

      <InputComp
        controlClass={className.name}
        type="text"
        placeholder="Nombre"
        handlerChange={handleInputChange}
        name="name"
        value={data.name}
      ></InputComp>

      <Btn
        text="enviar"
        click={(e) => {
          e.preventDefault();
          setSubmit([]);
        }}
      ></Btn>
      {success ? (
        <PInfo
          info={
            "Registrado correctamente, se ha enviado un correo para que valides tu email"
          }
        ></PInfo>
      ) : null}
      <PError err={err}></PError>
    </form>
  );
}

export default FormRegister;
