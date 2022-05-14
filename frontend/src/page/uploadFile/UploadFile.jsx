import { useState } from "react";
import Btn from "../../components/btn";
import Footer from "../../components/footer";
import Header from "../../components/header";
import PError from "../../components/pError";
import { paserXML } from "../../utility/paserXML.js";
import {
  validationFile,
  validationName,
  validationDifficulty,
  validationDescription,
  validationDate,
  validationDistance,
  validationCords,
  validationSlope,
} from "../../utility/validation";
import axios from "axios";
import MapUpload from "../../components/mapUpload";
import InputComp from "../../components/InputComp";
import uniqid from "uniqid";

const reader = new FileReader();
const token = sessionStorage.getItem("token");

function UploadFile() {
  const [err, SetErr] = useState("");
  const [success, SetSuccess] = useState(null);
  const [gpx, SetGpx] = useState(false);
  const [data, setData] = useState({
    title: "",
    difficulty: "choose",
    description: "",
    file: "",
  });
  const [className, SetClassname] = useState({
    title: false,
    difficulty: false,
    description: false,
    file: false,
  });

  const handleInputChange = (event) => {
    if (event.target.name === "title") {
      SetClassname({
        ...className,
        title: validationName(event.target.value),
      });
    }
    if (event.target.name === "difficulty") {
      SetClassname({
        ...className,
        difficulty: validationDifficulty(event.target.value),
      });
    }
    if (event.target.name === "description") {
      SetClassname({
        ...className,
        description: validationDescription(event.target.value),
      });
    }
    if (event.target.name === "file") {
      SetClassname({ ...className, file: validationName(event.target.value) });
    }
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const sendFile = (e) => {
    SetErr("");

    if (e.target.files[0].size > 3000000) {
      //3M
      SetClassname({ ...className, file: false });
      return SetErr("excede del tamaño máximo");
    }
    if (!validationFile(e.target.files[0].name)) {
      SetClassname({ ...className, file: false });
      return SetErr("Formato invalido");
    }
    SetClassname({ ...className, file: true });

    reader.readAsText(e.target.files[0]);
    reader.onload = () => {
      const text = reader.result;
      const dataXML = paserXML(text);

      const dataGpx = { file: e.target.files[0], ...dataXML };
      SetGpx(dataGpx);
    };
  };

  const submitData = (e) => {
    e.preventDefault();
    SetErr();

    if (!gpx.file) {
      return SetErr("no se subio el archivo");
    }

    if (!className.file) {
      return SetErr("Sube un archivo correcto");
    }

    if (!className.title) {
      return SetErr("Indica el titulo de la ruta");
    }
    if (!className.difficulty) {
      return SetErr("dificultad invalida");
    }
    if (!className.description) {
      return SetErr("Indica una descripcion correcta");
    }

    if (!validationDate(gpx.date)) {
      SetErr("archivo no valido por la fecha");
    }
    if (!gpx.slope || !validationSlope(gpx.slope.negative)) {
      return SetErr("archivo no valido, desnivel incorrecto");
    }

    if (!validationDistance(gpx.distance)) {
      return SetErr("archivo no valido");
    }

    if (!gpx.slope || !validationSlope(gpx.slope.positive)) {
      return SetErr("archivo no valido, desnivel incorrecto");
    }

    if (!gpx.slope || !validationSlope(gpx.slope.min)) {
      return SetErr("archivo no valido, altura min incorrecto");
    }
    if (!gpx.slope || !validationSlope(gpx.slope.max)) {
      return SetErr("archivo no valido, altura max incorrecto");
    }

    if (!gpx.firstcord || !validationCords(gpx.firstcord.lat)) {
      return SetErr("archivo no valido, altura max incorrecto");
    }
    if (!gpx.firstcord || !validationCords(gpx.firstcord.lon)) {
      return SetErr("archivo no valido, altura max incorrecto");
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-type", "multipart/form-data");

    const dataForm = new FormData();

    dataForm.append("file", gpx.file);
    dataForm.append("title", data.title);
    dataForm.append("difficulty", data.difficulty);
    dataForm.append("description", data.description);
    dataForm.append("date", gpx.date);
    dataForm.append("distance", gpx.distance);
    dataForm.append("min", gpx.slope.min);
    dataForm.append("max", gpx.slope.max);
    dataForm.append("positive", gpx.slope.positive);
    dataForm.append("negative", gpx.slope.negative);
    dataForm.append("lat", gpx.firstcord.lat);
    dataForm.append("lon", gpx.firstcord.lon);
    dataForm.append("token", token);
    axios
      .post("http://localhost:3001/app/upload", dataForm)
      .then((res) => {
        SetSuccess("ruta subida");
        SetClassname({
          title: false,
          difficulty: false,
          description: false,
          file: false,
        });
        setData({
          title: "",
          difficulty: "choose",
          description: "",
          file: uniqid(),
        });
      })
      .catch((err) => {
        console.log();
        if (err.response === undefined) {
          SetErr("No se pudo conectar con el servidor");
        } else {
          SetErr(err.response.data.err);
        }
      });
  };

  return (
    <>
      <Header></Header>
      <h2>Subir ruta</h2>
      <form encType="multipart/form-data">
        <InputComp
          value={data.title}
          handlerChange={handleInputChange}
          name="title"
          placeholder={"titulo de la ruta"}
          className={className.title ? "correct" : "incorrect"}
        ></InputComp>
        <select
          name="difficulty"
          onChange={handleInputChange}
          className={className.difficulty ? "correct" : "incorrect"}
          value={data.difficulty}
        >
          <option value="choose">elige la dificultad de la ruta</option>
          <option value="facil">Facil</option>
          <option value="media">Media</option>
          <option value="dificil">Dificil</option>
        </select>
        <textarea
          name="description"
          onChange={handleInputChange}
          className={className.description ? "correct" : "incorrect"}
          value={data.description}
        ></textarea>

        <input
          key={data.file}
          type="file"
          placeholder="Sube tu ruta"
          onChange={sendFile}
          name="file"
          className={className.file ? "correct" : "incorrect"}
        ></input>
        <Btn text="enviar" click={submitData} state={!gpx}></Btn>
      </form>
      <PError err={err}></PError>
      <PError err={success}></PError>

      {gpx ? (
        <MapUpload mapCords={gpx.firstcord} track={gpx.track}></MapUpload>
      ) : null}
      <Footer></Footer>
    </>
  );
}
export default UploadFile;
