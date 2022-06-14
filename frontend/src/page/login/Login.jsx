import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validationEmail, validationPass } from "../../utility/validation.js";
import { UseFetchLoading } from "../../service/useFetch.jsx";

import Btn from "../../components/btn.jsx";
import H1 from "../../components/h1.jsx";
import ComponentLink from "../../components/link.jsx";
import PError from "../../components/pError.jsx";
import InputComp from "../../components/InputComp.jsx";
import Spinner from "../../components/spinner.jsx";
import FormLogin from "../../components/formLogin.jsx";

function Login() {
  //navegate
  const navigate = useNavigate();

  //use state
  const [className, SetClassname] = useState({
    email: false,
    pass: false,
  });
  const [err, setErr] = useState();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    pass: "",
  });

  //handle de state and validation
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
  //submitValidation and fecht
  const submitDataValidation = (event) => {
    event.preventDefault();

    setLoading(true);
    if (!validationEmail(data.email) || !validationPass(data.pass)) {
      setErr("email o password incorrecto");
      setLoading(false);
    } else {
      setData({
        email: "",
        pass: "",
      });
      SetClassname({
        email: false,
        pass: false,
      });

      UseFetchLoading(
        "http://localhost:3001/login/",
        data,
        setLoading,
        setErr
      ).then((res) => {
        if (res) {
          window.sessionStorage.setItem("token", res.token);
          window.sessionStorage.setItem("name", res.name);
          navigate("/app/index");
        }
      });
    }
  };

  return (
    <>
      <H1 text="Login"></H1>
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
          controlClass={className.pass}
          type="password"
          placeholder="Contraseña"
          handlerChange={handleInputChange}
          name="pass"
          value={data.pass}
        ></InputComp>

        <Btn text="Enviar" click={submitDataValidation}></Btn>
        <PError err={err}></PError>

        <Spinner controlClass={loading}></Spinner>
      </FormLogin>
      <ComponentLink text="Registrate" url="/register"></ComponentLink>
      <ComponentLink text="Olvidaste contraseña" url="/reset"></ComponentLink>
    </>
  );
}

export default Login;
