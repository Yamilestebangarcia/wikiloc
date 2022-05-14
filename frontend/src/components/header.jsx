import H1 from "./h1";
import InputComp from "./InputComp";
import Btn from "./btn";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Nav from "./nav";

function Header() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  function close() {
    window.sessionStorage.removeItem("token");
    navigate("/");
  }

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const searchRute = () => {
    navigate(`/app/search/?search=${search}`);
  };

  return (
    <>
      <H1 text="Wikiloc"></H1>

      <InputComp
        type="search"
        placeholder="Buscar Ruta"
        handlerChange={handleInputChange}
        name="search"
        className={null}
        value={search}
      ></InputComp>
      <Btn click={searchRute} text="Buscar"></Btn>
      <Btn click={close} text="Cerrar sesion"></Btn>
      <Nav></Nav>
    </>
  );
}
export default Header;
