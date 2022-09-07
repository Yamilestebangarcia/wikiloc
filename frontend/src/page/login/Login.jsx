import { useState } from "react";
import H1 from "../../components/h1.jsx";
import ComponentLink from "../../components/link.jsx";
import Spinner from "../../components/spinner.jsx";
import FormLogin from "../../components/login/formLogin";

function Login() {
  //use state

  const [loading, setLoading] = useState(false);

  return (
    <>
      <H1 text="Login"></H1>
      <FormLogin setLoading={setLoading} />
      <ComponentLink text="Registrate" url="/register"></ComponentLink>
      <ComponentLink text="Olvidaste contraseña" url="/reset"></ComponentLink>
      <Spinner controlClass={loading}></Spinner>
    </>
  );
}

export default Login;
