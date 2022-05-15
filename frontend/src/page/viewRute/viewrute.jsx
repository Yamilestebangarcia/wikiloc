import Header from "../../components/header";
import Footer from "../../components/footer";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MapView from "../../components/mapView";
import { useNavigate } from "react-router-dom";
import { getTrackMinElevCord } from "../../utility/paserXML";
import Chart from "../../components/chart";
import Btn from "../../components/btn";

function ViewRute() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idRute = searchParams.get("rute");
  const token = window.sessionStorage.getItem("token");
  const [mapCords, setMapCords] = useState();
  const [track, setTrack] = useState();
  const [trackSlope, setTrackSlope] = useState();

  useEffect(() => {
    const data = { idRute, token };
    fetch("http://localhost:3001/app/viewTrack", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        return new window.DOMParser().parseFromString(res, "text/xml");
      })
      .then((res) => {
        const arrayCordElev = getTrackMinElevCord(res);

        setTrackSlope(arrayCordElev.map((el) => parseInt(el.ele)));

        setTrack(arrayCordElev);
      })
      .catch((err) => {
        console.log(err.message);
      });

    //otro fecht
    fetch("http://localhost:3001/app/view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.err) {
          window.sessionStorage.removeItem("token");
          navigate("/");
        }

        setMapCords({ ...res, mapCords: [res.lat, res.lon] });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <Header />
      {mapCords && track && trackSlope ? (
        <>
          <h1>{mapCords.title}</h1>
          <Btn
            click={() => {
              navigate(`../app/follow?id=${mapCords._id}`);
            }}
            text="Seguir Ruta"
          />

          <MapView mapCords={mapCords.mapCords} track={track} />
          <p>{mapCords.description}</p>
          <Chart track={trackSlope}></Chart>

          <ul>
            <li>Dificultad: {mapCords.difficulty}</li>
            <li>Distancia: {mapCords.distance} km</li>
            <li>Altura máxima: {mapCords.maximumHeight} m</li>
            <li>Altura mínima: {mapCords.minimunHeight} m</li>
            <li>Desnvel positivo: {mapCords.slopePositive} m</li>
            <li>Desnivel negativo: {mapCords.slopeNegative} m</li>
            <li>fecha: {mapCords.date}</li>
            <li>Pertenece a: {mapCords.userName}</li>
          </ul>
        </>
      ) : (
        <p>cargando...</p>
      )}
      <Footer></Footer>
    </>
  );
}

export default ViewRute;
