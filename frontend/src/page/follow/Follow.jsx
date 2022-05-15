import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MapFollow from "../../components/mapFollow";
import { getTrackMinElevCord } from "../../utility/paserXML";
import { getWatchPosition } from "../../utility/geolocation";

function Follow() {
  const [searchParams] = useSearchParams();
  const idRute = searchParams.get("id");
  const token = window.sessionStorage.getItem("token");
  const [track, setTrack] = useState();
  const [position, setPosition] = useState();
  const [full, setFull] = useState(undefined);

  function getPosition() {
    getWatchPosition()
      .then((res) => {
        setPosition(res.coords);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    if (full) {
      document.querySelector(".leaflet-container").requestFullscreen();
    }
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        setFull(false);
      }
    });
  }, [full]);

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
        setTrack(getTrackMinElevCord(res));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  //  console.log(position);
  return (
    <>
      {track ? (
        <>
          <MapFollow
            mapCords={[track[0].lat, track[0].lon]}
            track={track}
            marker={position}
            getPosition={getPosition}
          />

          <button
            onClick={() => {
              setFull(true);
            }}
          >
            pantalla completa
          </button>

          {position ? (
            <>
              <ul>
                <li>
                  Posicion:
                  <ul>
                    <li>{`lat ${position.latitude}`}</li>
                    <li> {`lon ${position.longitude}`}</li>
                  </ul>
                </li>
                <li>Precisión Posicion: {position.accuracy}</li>
                <li>Altura: {position.altitude}</li>
                <li>Precisión altura: {position.altitudeAccuracy}</li>
                <li>Velocidad: {position.speed}</li>
              </ul>
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
}
export default Follow;
