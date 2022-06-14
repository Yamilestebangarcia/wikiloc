import styles from "./spinner.module.css";
function Spinner({ controlClass }) {
  return (
    <div className={controlClass ? styles.active : styles.disabled}>
      <svg
        className={styles.svg}
        enableBackground="new 0 0 0 0"
        version="1.1"
        viewBox="0 0 80 50"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={styles.opacity1}
          cx="0"
          cy="25"
          r="12"
          fill="#4e944f"
        />
        <circle
          className={styles.opacity2}
          cx="40"
          cy="25"
          r="12"
          fill="#4e944f"
        />
        <circle
          className={styles.opacity3}
          cx="80"
          cy="25"
          r="12"
          fill="#4e944f"
        />
      </svg>
    </div>
  );
}

export default Spinner;
