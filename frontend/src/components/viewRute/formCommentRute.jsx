import Btn from "../btn";

function FormCommentRute({ styles, value, SetValue, SetSubmit }) {
  return (
    <form className={styles.form}>
      <label htmlFor="coment"></label>
      <textarea
        className={styles.textarea}
        id="coment"
        onChange={(e) => SetValue(e.target.value)}
        placeholder="Escribe aqui tu comentario"
        value={value}
      ></textarea>
      <Btn
        text="Comentar"
        click={(e) => {
          e.preventDefault();
          SetSubmit([]);
        }}
      />
    </form>
  );
}

export default FormCommentRute;
