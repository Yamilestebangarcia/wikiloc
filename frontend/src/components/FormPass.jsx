import { Link } from "react-router-dom";

function FormPass({ link, textLink, enviarDatos, handleInputChange, err }) {
  return (
    <>
      <form onSubmit={enviarDatos}>
        <input
          type="text"
          placeholder="Email"
          onChange={handleInputChange}
          name="email"
        ></input>
        <input
          type="password"
          placeholder="Contraseña"
          onChange={handleInputChange}
          name="pass"
        ></input>
        <button> Enviar</button>

        <p>
          <Link to={link}>{textLink}</Link>
        </p>
        <p>
          <Link to="/reset">¿Olvidaste contraseña?</Link>
        </p>
      </form>
      <p>{err}</p>
    </>
  );
}

export default FormPass;
