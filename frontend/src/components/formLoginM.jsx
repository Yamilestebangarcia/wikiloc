import styles from "./formLogin.module.css";
function FormLogin(props, { encType }) {
  return (
    <form className={styles.form} encType={encType}>
      {props.children}
    </form>
  );
}

export default FormLogin;
