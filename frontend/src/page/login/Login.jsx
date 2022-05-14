import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../../components/btn.jsx";
import H1 from "../../components/h1.jsx";

import ComponentLink from "../../components/link.jsx";
import PError from "../../components/pError.jsx";
import { validationEmail, validationPass } from "../../utility/validation.js";
import InputComp from "../../components/InputComp.jsx";
function Login() {
  const navigate = useNavigate();

  const [className, SetClassname] = useState({
    email: false,
    pass: false,
  });
  const [err, setErr] = useState();
  const [loading, setLoadign] = useState(false);

  const [data, setData] = useState({
    email: "",
    pass: "",
  });

  function fetchData(data) {
    fetch("http://localhost:3001/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        setLoadign(false);
        return res.json();
      })
      .then((res) => {
        if (res.err) {
          setErr(res.err);
        }
        if (res.token) {
          window.sessionStorage.setItem("token", res.token);
          window.sessionStorage.setItem("name", res.name);

          navigate("/app");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const handleInputChange = (event) => {
    SetClassname({
      ...className,
      [event.target.name]:
        event.target.name === "email"
          ? validationEmail(event.target.value)
          : validationPass(event.target.value),
    });
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const submitData = (event) => {
    event.preventDefault();

    setLoadign(true);
    if (!validationEmail(data.email) || !validationPass(data.pass)) {
      setErr("email o password incorrecto");
    } else {
      setData({
        email: "",
        pass: "",
      });
      fetchData(data);
    }
  };

  return (
    <>
      <H1 text="Login"></H1>
      <form>
        {/*  <Input
          className={className.email ? "correct" : "incorrect"}
          type="text"
          placeholder="Email"
          event={handleInputChange}
          name="email"
        ></Input> */}
        <InputComp
          className={className.email ? "correct" : "incorrect"}
          type="text"
          placeholder="Email"
          handlerChange={handleInputChange}
          name="email"
          value={data.email}
        ></InputComp>
        <InputComp
          className={className.pass ? "correct" : "incorrect"}
          type="password"
          placeholder="Contraseña"
          handlerChange={handleInputChange}
          name="pass"
          value={data.pass}
        ></InputComp>
        {/*      <Input
          className={className.pass ? "correct" : "incorrect"}
          type="password"
          placeholder="Contraseña"
          event={handleInputChange}
          name="pass"
        ></Input> */}

        <Btn text="Enviar" click={submitData}></Btn>
      </form>

      <ComponentLink text="¿Registrate?" url="/register"></ComponentLink>
      <ComponentLink text="¿Olvidaste contraseña?" url="/reset"></ComponentLink>
      <PError err={err}></PError>
      {loading ? <PError err="cargando"></PError> : null}
    </>
  );
}

export default Login;
