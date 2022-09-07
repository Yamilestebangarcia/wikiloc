import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getTrackMinElevCord } from "../../utility/paserXML";
import { getWatchPosition } from "../../utility/geolocation";
import { useFetchFollow } from "../../service/useFetch";
import { fullScreem } from "../../service/utility";

import Spinner from "../../components/spinner.jsx";
import MapFollow from "../../components/follow/mapFollow";
import iconGps from "../../assets/img/iconGps.svg";
import iconFullScreen from "../../assets/img/screenFull.svg";
import Nav from "../../components/nav";
import Perror from "../../components/perror";
import BtnMap from "../../components/follow/btnMap";
import LegendPosition from "../../components/follow/legendPosition";

import styles from "./follow.module.css";

function Follow() {
  //navigation ,params and token
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idRute = searchParams.get("id");
  const token = window.sessionStorage.getItem("token");

  //states
  const [track, setTrack] = useState();
  const [position, setPosition] = useState();
  const [full, setFull] = useState(undefined);
  const [err, setErr] = useState();
  const [loading, setLoading] = useState(true);

  //get position
  function getPosition() {
    getWatchPosition()
      .then((res) => {
        setPosition(res.coords);
      })
      .catch((err) => console.log(err));
  }

  //handle full screen
  function changeFull() {
    if (full) {
      setFull(false);
    } else {
      setFull(true);
    }
  }

  //change screen full
  useEffect(() => {
    fullScreem(full, setFull);
  }, [full]);

  //fetch
  useEffect(() => {
    useFetchFollow(
      "http://localhost:3001/app/viewTrack",
      { idRute, token },
      setLoading,
      setErr
    ).then((res) => {
      if (res) {
        setTrack(getTrackMinElevCord(res));
      } else {
        window.sessionStorage.removeItem("token");
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      {full ? null : <Nav controlClass={styles.nav}></Nav>}{" "}
      {track && !err ? (
        <MapFollow
          full={full}
          mapCords={[track[0].lat, track[0].lon]}
          track={track}
          position={position}
        >
          <BtnMap
            onClick={getPosition}
            src={iconGps}
            classNameC={styles.btn}
            alt={"Posicion Actual"}
          />
          <BtnMap
            onClick={changeFull}
            src={iconFullScreen}
            classNameC={[styles.btn, styles.screenFull].join(" ")}
            alt={"Pantalla Completa"}
          />

          <LegendPosition position={position} classNameC={styles.position} />
        </MapFollow>
      ) : null}
      <Spinner controlClass={loading}></Spinner>
      <Perror err={err} />
    </>
  );
}
export default Follow;
