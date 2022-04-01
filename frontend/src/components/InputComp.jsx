import "./inputComp.css";
function InputComp({
  handlerChange,
  value,
  type,
  placeholder,
  name,
  className,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      name={name}
      value={value}
      onChange={handlerChange}
    ></input>
  );
}

export default InputComp;
