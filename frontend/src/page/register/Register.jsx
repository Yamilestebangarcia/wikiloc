import { useState } from "react";
import {
  validationEmail,
  validationPass,
  validationName,
} from "../../utility/validation.js";
import { useFetchRegister } from "../../service/useFetch.jsx";

import Btn from "../../components/btn.jsx";
import H1 from "../../components/h1.jsx";
import ComponentLink from "../../components/link.jsx";
import PError from "../../components/pError.jsx";
import InputComp from "../../components/InputComp";
import FormLogin from "../../components/formLogin.jsx";
import PInfo from "../../components/Info.jsx";
import Spinner from "../../components/spinner.jsx";

function Register() {
  //state
  const [className, SetClassname] = useState({
    email: false,
    pass1: false,
    pass2: false,
    name: false,
  });
  const [err, setErr] = useState();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    pass1: "",
    pass2: "",
    name: "",
  });

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

  //submitValidation and fecht
  const submitData = (event) => {
    event.preventDefault();
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
  };

  return (
    <>
      <H1 text="Register"></H1>
      <FormLogin>
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

        <Btn text="enviar" click={submitData}></Btn>
        {success ? (
          <PInfo
            info={
              "Registrado correctamente, se ha enviado un correo para que valides tu email"
            }
          ></PInfo>
        ) : null}

        <Spinner controlClass={loading}></Spinner>
        <PError err={err}></PError>
        <ComponentLink text="¿Logueate?" url="/"></ComponentLink>
        <ComponentLink
          text="¿Olvidaste contraseña?"
          url="/reset"
        ></ComponentLink>
      </FormLogin>
    </>
  );
}

export default Register;
