import { useState } from "react";
import { validationEmail } from "../../utility/validation";
import { useFetchRegister } from "../../service/useFetch";

import InputComp from "../InputComp";
import Btn from "../btn";
import PError from "../pError";

import styles from "../formLogin.module.css";

function FormChangePass({ setLoading, setShow }) {
  //states
  const [className, SetClassname] = useState(false);
  const [err, setErr] = useState(null);
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
      <form className={styles.form}>
        <InputComp
          controlClass={className}
          type="text"
          placeholder="Email"
          handlerChange={handleInputChange}
          name="email"
          value={email}
        ></InputComp>

        <Btn click={submit} text="Enviar"></Btn>
      </form>
      <PError err={err}></PError>
    </>
  );
}

export default FormChangePass;
