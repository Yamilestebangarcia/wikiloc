import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validationEmail, validationPass } from "../../utility/validation";
import { UseFetchLoading } from "../../service/useFetch";
import InputComp from "../InputComp";
import Btn from "../btn";
import PError from "../pError";

import styles from "../formLogin.module.css";
function FormLogin({ setLoading }) {
  //navegate
  const navigate = useNavigate();

  //states
  const [className, SetClassname] = useState({
    email: false,
    pass: false,
  });
  const [err, setErr] = useState();
  const [data, setData] = useState({
    email: "",
    pass: "",
  });
  const [submit, setSubmit] = useState([]);

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
  useEffect(() => {
    if (data.email !== "") {
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
        controlClass={className.pass}
        type="password"
        placeholder="Contraseña"
        handlerChange={handleInputChange}
        name="pass"
        value={data.pass}
      ></InputComp>

      <Btn
        text="Enviar"
        click={useCallback((e) => {
          e.preventDefault();
          setSubmit([]);
        }, [])}
      ></Btn>
      <PError err={err}></PError>
    </form>
  );
}
export default FormLogin;
