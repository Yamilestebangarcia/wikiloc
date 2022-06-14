import styles from "./btn.module.css";
function Btn({ text, click, state, controlClass }) {
  return (
    <button
      onClick={click}
      disabled={state}
      className={controlClass ? controlClass : styles.btn}
    >
      {text}
    </button>
  );
}
export default Btn;
