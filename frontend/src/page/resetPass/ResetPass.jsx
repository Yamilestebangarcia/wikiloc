import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import H1 from "../../components/h1";
import PError from "../../components/pError";
import ComponentLink from "../../components/link";
import Btn from "../../components/btn";

import { validationPass } from "../../utility/validation.js";
import InputComp from "../../components/InputComp.jsx";
function ResetPass() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  function fetchData(data) {
    return fetch("http://localhost:3001/login/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        if (res !== undefined) {
          if (res.err) {
            setErr(res.err);
          }
        }
      })

      .catch((err) => console.log(err));
  }
  const [className, SetClassname] = useState({
    pass1: false,
    pass2: false,
  });
  const [err, setErr] = useState();
  const [data, setData] = useState({
    pass1: "",
    pass2: "",
  });

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

  const submitData = (event) => {
    event.preventDefault();
    if (data.pass1 !== data.pass2) {
      return setErr("las contraseñas no coinciden");
    }
    if (!token) {
      return setErr("no existe token");
    }
    const SendData = { pass: data.pass1, token };
    console.log(SendData);
    fetchData(SendData);
  };

  return (
    <>
      <H1 text="Restaurar contraseña"></H1>

      <form onSubmit={submitData}>
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
        <Btn text="enviar" click={null}></Btn>
        <ComponentLink text="Logearse" url="/"></ComponentLink>
        <ComponentLink text="Registrase" url="/register"></ComponentLink>
      </form>

      <PError err={err}></PError>
    </>
  );
}

export default ResetPass;
