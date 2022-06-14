import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { validationPass } from "../../utility/validation.js";
import { useFetchResetPass } from "../../service/useFetch.jsx";

import H1 from "../../components/h1";
import PError from "../../components/pError";
import ComponentLink from "../../components/link";
import Btn from "../../components/btn";
import InputComp from "../../components/InputComp.jsx";
import FormLogin from "../../components/formLogin";

function ResetPass() {
  //params, token and navigate
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  //state
  const [className, SetClassname] = useState({
    pass1: false,
    pass2: false,
  });
  const [err, setErr] = useState();
  const [data, setData] = useState({
    pass1: "",
    pass2: "",
  });

  //handle state and validation

  const handleInputChange = (event) => {
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
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  // submitValidation and fetch
  const submitData = (event) => {
    event.preventDefault();
    if (data.pass1 !== data.pass2) {
      return setErr("las contraseñas no coinciden");
    }
    if (!token) {
      return setErr("no existe token");
    }

    useFetchResetPass(
      "http://localhost:3001/login/update",
      { pass: data.pass1, token },
      setErr
    ).then((res) => {
      if (res) {
        navigate("/");
      }
    });
  };

  return (
    <>
      <H1 text="Restaurar contraseña"></H1>
      <FormLogin>
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
        <Btn text="enviar" click={submitData}></Btn>
        <PError err={err}></PError>
        <ComponentLink text="Logearse" url="/"></ComponentLink>
        <ComponentLink text="Registrase" url="/register"></ComponentLink>
      </FormLogin>
    </>
  );
}

export default ResetPass;
