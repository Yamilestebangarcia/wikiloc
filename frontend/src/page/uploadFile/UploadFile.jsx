import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

import Btn from "../../components/btn";
import Footer from "../../components/footer";
import Header from "../../components/header";
import PError from "../../components/pError";
import PInfo from "../../components/Info";
import InputComp from "../../components/InputComp";
import FormLogin from "../../components/formLogin";
import MapUpload from "../../components/mapUpload";

import styles from "./updateFile.module.css";

//creo la insatacia de fileReader
const reader = new FileReader();

function UploadFile() {
  //token and navegation
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  //states
  const [err, SetErr] = useState("");
  const [success, SetSuccess] = useState(null);
  const [gpx, SetGpx] = useState(false);
  const [data, setData] = useState({
    title: "",
    difficulty: "choose",
    description: "",
  });
  const [className, SetClassname] = useState({
    title: false,
    difficulty: false,
    description: false,
    file: false,
  });

  //refs
  const ref = useRef();

  //handler events
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
  //Validation file
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

  // validation form
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
    fecthAxios();
  };

  //fetch
  function fecthAxios() {
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
        });
        SetGpx(false);
        ref.current.value = "";
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.sessionStorage.removeItem("token");
          navigate("/");
          return () => {
            unmounted = true;
          };
        }

        if (err.response === undefined) {
          SetErr("No se pudo conectar con el servidor");
        } else {
          SetErr(err.response.data.err);
        }
      });
  }

  return (
    <>
      <Header></Header>
      <h2 className={styles.h2}>Subir ruta</h2>
      <FormLogin encType="multipart/form-data">
        <InputComp
          value={data.title}
          handlerChange={handleInputChange}
          name="title"
          placeholder={"titulo de la ruta"}
          controlClass={className.title}
        ></InputComp>
        <select
          name="difficulty"
          onChange={handleInputChange}
          className={
            (className.difficulty ? styles.correct : styles.incorrect) +
            " " +
            styles.select
          }
          value={data.difficulty}
        >
          <option className={styles.option} value="choose">
            Elige la dificultad de la ruta
          </option>
          <option className={styles.option} value="facil">
            Facil
          </option>
          <option className={styles.option} value="media">
            Media
          </option>
          <option className={styles.option} value="dificil">
            Dificil
          </option>
        </select>
        <textarea
          name="description"
          onChange={handleInputChange}
          className={
            (className.description ? styles.correct : styles.incorrect) +
            " " +
            styles.textarea
          }
          value={data.description}
        ></textarea>
        <InputComp
          refPro={ref}
          type="file"
          placeholder="Sube tu ruta"
          handlerChange={sendFile}
          name="file"
          controlClass={className.file}
        ></InputComp>

        <Btn text="enviar" click={submitData} state={!gpx}></Btn>
      </FormLogin>

      <PError err={err}></PError>
      <PInfo info={success}></PInfo>

      {gpx ? (
        <>
          <MapUpload mapCords={gpx.firstcord} track={gpx.track}></MapUpload>
        </>
      ) : null}

      <Footer></Footer>
    </>
  );
}
export default UploadFile;
