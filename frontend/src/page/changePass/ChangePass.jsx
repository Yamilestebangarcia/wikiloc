import { useState } from "react";
import H1 from "../../components/h1.jsx";
import ComponentLink from "../../components/link.jsx";
import Spinner from "../../components/spinner.jsx";
import PInfo from "../../components/Info.jsx";
import FormChangePass from "../../components/changePass/FormChangePass.jsx";

function ChangePass() {
  //useState

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

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
          <FormChangePass setLoading={setLoading} setShow={setShow} />
          <Spinner controlClass={loading}></Spinner>
          <ComponentLink text="Logearse" url="/"></ComponentLink>
          <ComponentLink text="Registrase" url="/register"></ComponentLink>
        </>
      )}
    </>
  );
}

export default ChangePass;
