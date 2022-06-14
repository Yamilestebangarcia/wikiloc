import styles from "./Info.module.css";
function PInfo({ info, ControlClass }) {
  return (
    <p
      className={
        info ? (ControlClass ? styles.footer : styles.info) : styles.disabled
      }
    >
      {info}
    </p>
  );
}
export default PInfo;
