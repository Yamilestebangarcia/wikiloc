import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrackMinElevCord } from "../../utility/paserXML";
import { useFetchFollow, UseFetchLoading } from "../../service/useFetch";
import Header from "../../components/header/header";
import Footer from "../../components/footer";
import Btn from "../../components/btn";
import Spinner from "../../components/spinner";
import MapView from "../../components/viewRute/mapView";
import CardView from "../../components/viewRute/cardView";
import PError from "../../components/pError";
import PInfo from "../../components/Info";
import styles from "./viewRute.module.css";

function ViewRute() {
  //navigation params and token
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idRute = searchParams.get("rute");
  const token = window.sessionStorage.getItem("token");

  //states
  const [mapCords, setMapCords] = useState();
  const [track, setTrack] = useState();
  const [point, setPoint] = useState();
  const [pointChart, setpointChart] = useState();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState();
  const [info, setInfo] = useState();

  //fecht
  useEffect(() => {
    useFetchFollow(
      "http://localhost:3001/app/viewTrack",
      { idRute, token },
      setLoading,
      setErr
    ).then((res) => {
      if (res) {
        setTrack(getTrackMinElevCord(res));
      }
    });

    //otro fecht

    UseFetchLoading(
      "http://localhost:3001/app/view",
      { idRute, token },
      setLoading,
      setErr
    ).then((res) => {
      if (res) {
        setMapCords({ ...res, mapCords: [res.lat, res.lon] });
      } else {
        window.sessionStorage.removeItem("token");
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      <Header />

      {mapCords && track ? (
        <>
          <h2 className={styles.h2}>{mapCords.title}</h2>

          <MapView
            mapCords={mapCords.mapCords}
            track={track}
            setPoint={setPoint}
            pointChart={pointChart}
          />

          <div className={styles.btn}>
            <Btn
              click={() => {
                navigate(`../app/follow?id=${mapCords._id}`);
              }}
              text="Seguir Ruta"
            />
          </div>
          {/* componente card */}
          <CardView
            mapCords={mapCords}
            track={track}
            point={point}
            setpointChart={setpointChart}
            token={token}
            idRute={idRute}
            setErr={setErr}
            setInfo={setInfo}
          />
        </>
      ) : null}

      <Spinner controlClass={loading}></Spinner>
      <PError err={err} />
      <PInfo info={info} />

      <Footer></Footer>
    </>
  );
}

export default ViewRute;
