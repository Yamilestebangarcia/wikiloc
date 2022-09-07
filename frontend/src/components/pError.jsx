import { memo } from "react";

import close from "./../assets/img/close.svg";

import styles from "./pError.module.css";
function PError({ err, controlClass, setErr }) {
  return (
    <p
      className={
        err ? (controlClass ? styles.footer : styles.err) : styles.disabled
      }
    >
      {err}
      {setErr ? (
        <img
          src={close}
          alt="cerrar"
          className={styles.close}
          onClick={() => {
            setErr(undefined);
          }}
        />
      ) : null}
    </p>
  );
}
export default memo(PError);
