import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchDeleteVerificate } from "../../service/useFetch";

import H1 from "../../components/h1";
import PInfo from "../../components/Info";
import ComponentLink from "../../components/link.jsx";
import PError from "../../components/pError";

function DeleteVerified({ method, url, text }) {
  //params and token
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  //state
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  //fetch

  useEffect(() => {
    useFetchDeleteVerificate(url, method, token, setSuccess, setErr);
  }, []);

  return (
    <>
      <H1 text={text}></H1>
      <PError err={err}></PError>
      <PInfo info={success}></PInfo>

      <ComponentLink text="Logearse" url="/"></ComponentLink>
      <ComponentLink text="Registrase" url="/register"></ComponentLink>
    </>
  );
}

export default DeleteVerified;
