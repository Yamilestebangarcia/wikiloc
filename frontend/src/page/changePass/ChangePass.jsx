import { useState } from "react";
import { validationEmail } from "../../utility/validation.js";
import { useFetchRegister } from "../../service/useFetch.jsx";
import H1 from "../../components/h1.jsx";
import PError from "../../components/pError.jsx";
import ComponentLink from "../../components/link.jsx";
import Btn from "../../components/btn.jsx";
import InputComp from "../../components/InputComp";
import FormLogin from "../../components/formLogin.jsx";
import Spinner from "../../components/spinner.jsx";
import PInfo from "../../components/Info.jsx";

function ChangePass() {
  //useState
  const [className, SetClassname] = useState(false);
  const [err, setErr] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  //handle state and validation
  const handleInputChange = (event) => {
    SetClassname(validationEmail(event.target.value));
    setEmail(event.target.value);
  };

  //submitValidation and fecht
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validationEmail(email)) {
      setErr("email incorrecto");
      setLoading(false);
    } else {
      useFetchRegister(
        "http://localhost:3001/login/emailReset",
        { email },
        setLoading,
        setErr
      ).then((res) => {
        if (res) {
          setShow(true);
        }
        setEmail("");
      });
    }
  };

  return (
    <>
      <H1 text="Restaurar contraseña"></H1>

      {show ? (
        <div>
          <PInfo info="Revisa Tu correo"></PInfo>
          <PInfo info="si no lo encuntras mira en el spam"></PInfo>
        </div>
      ) : (
        <>
          <FormLogin>
            <InputComp
              controlClass={className}
              type="text"
              placeholder="Email"
              handlerChange={handleInputChange}
              name="email"
              value={email}
            ></InputComp>

            <Btn click={submit} text="Enviar"></Btn>

            <PError err={err}></PError>
            <Spinner controlClass={loading}></Spinner>
          </FormLogin>
          <ComponentLink text="Logearse" url="/"></ComponentLink>
          <ComponentLink text="Registrase" url="/register"></ComponentLink>
        </>
      )}
    </>
  );
}

export default ChangePass;
