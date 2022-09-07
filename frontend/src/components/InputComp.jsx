import { memo } from "react";

import styles from "./inputComp.module.css";
function InputComp({
  refPro,
  handlerChange,
  value,
  type,
  placeholder,
  name,
  controlClass,
  presskey,
}) {
  return (
    <input
      ref={refPro}
      type={type}
      placeholder={placeholder}
      className={
        (typeof controlClass !== "boolean"
          ? controlClass
          : controlClass
          ? styles.correct
          : styles.incorrect) +
        " " +
        styles.inputComp
      }
      name={name}
      value={value}
      onChange={handlerChange}
      onKeyDown={presskey}
    ></input>
  );
}

export default InputComp;
