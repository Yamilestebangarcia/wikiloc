import { useState } from "react";
import H1 from "../../components/h1.jsx";
import ComponentLink from "../../components/link.jsx";
import Spinner from "../../components/spinner.jsx";
import FormRegister from "../../components/register/FormRegister.jsx";

function Register() {
  //state

  const [loading, setLoading] = useState(false);

  return (
    <>
      <H1 text="Register"></H1>
      <FormRegister setLoading={setLoading} />

      <Spinner controlClass={loading}></Spinner>

      <ComponentLink text="¿Logueate?" url="/"></ComponentLink>
      <ComponentLink text="¿Olvidaste contraseña?" url="/reset"></ComponentLink>
    </>
  );
}

export default Register;
