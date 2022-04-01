import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import H1 from "../../components/h1";
import PError from "../../components/pError";

function DeleteVerified({ method, url, msgSuccess, msgErr, text }) {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("error");
        if (res.status === 200) {
          return setSuccess(msgSuccess);
        }
      })
      .catch((err) => {
        console.log(err);
        setErr(msgErr);
      });
  }, []);

  return (
    <>
      <H1 text={text}></H1>
      <PError err={err}></PError>
      <PError err={success}></PError>
    </>
  );
}

export default DeleteVerified;
