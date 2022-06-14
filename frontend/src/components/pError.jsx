import styles from "./pError.module.css";
import close from "./../assets/img/close.svg";
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
export default PError;
