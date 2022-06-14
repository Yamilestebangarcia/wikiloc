import styles from "./h1.module.css";
function H1({ text, controlClass }) {
  return <h1 className={controlClass ? controlClass : styles.login}>{text}</h1>;
}
export default H1;
