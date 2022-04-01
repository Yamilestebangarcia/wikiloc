function Btn({ text, click, state }) {
  return (
    <button onClick={click} disabled={state}>
      {text}
    </button>
  );
}
export default Btn;
