import { useNavigate } from "react-router-dom";
import Btn from "../../components/btn";
import Footer from "../../components/footer";
import Header from "../../components/header";
function IndexApp() {
  const name = window.sessionStorage.getItem("name");

  const navigate = useNavigate();

  const uploadRoute = () => {
    navigate("/app/upload");
  };

  const seeMap = () => {
    navigate("/app/seemap");
  };
  return (
    <>
      <Header close={close}></Header>
      <h2>{name}</h2>

      <Btn click={seeMap} text="Ver mapa"></Btn>
      <Btn click={uploadRoute} text="Subir Ruta"></Btn>
      <Footer></Footer>
    </>
  );
}

export default IndexApp;
