import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosition } from "../../utility/geolocation";

import Footer from "../../components/footer";
import Header from "../../components/header/header";
import Spinner from "../../components/spinner";
import MapSeeMap from "../../components/seeMap/mapSeeMap";

import styles from "./seeMap.module.css";
import "leaflet/dist/leaflet.css";
import PError from "../../components/pError";
import CardSeeMap from "../../components/seeMap/cardsSeeMap";
import { useFechtSeeMap } from "../../service/useFetch";

function seeMap() {
  //navigation and token
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  //states
  const [ruteData, setRuteData] = useState(null);
  const [cardData, setCardData] = useState(null);
  const [hoverCard, setHoverCard] = useState(null);
  const [err, setErr] = useState("");

  useEffect(async () => {
    let dataGps;
    try {
      dataGps = await getPosition();
    } catch (error) {
      dataGps = null;
    }

    useFechtSeeMap(
      "http://localhost:3001/app/seemap",
      { token },
      setErr,
      setRuteData
    ).then((res) => {
      if (res) {
        if (res.err) {
          if (res.err === "token no valido") {
            sessionStorage.removeItem("token");
            navigate("/");
          }
        } else {
          if (dataGps) {
            res.mapCords = [dataGps.coords.latitude, dataGps.coords.longitude];
          } else {
            res.mapCords = [res[0].lat, res[0].lon];
          }

          const dataCard = res.map(
            ({ distance, slopePositive, title, _id }) => {
              return { distance, slopePositive, title, _id };
            }
          );

          setCardData(dataCard);
          setRuteData(res);
        }
      } else {
        sessionStorage.removeItem("token");
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      <Header />
      <h2 className={styles.h2}>buscar rutas en el mapa</h2>

      <>
        {ruteData ? (
          <>
            <MapSeeMap
              mapCords={ruteData.mapCords}
              ruteData={ruteData}
              cardData={cardData}
              setCardData={setCardData}
              hoverCard={hoverCard}
              setHoverCard={setHoverCard}
            />
          </>
        ) : null}

        <Spinner controlClass={!ruteData} />
        <PError err={err} />

        <CardSeeMap
          cardData={cardData}
          setHoverCard={setHoverCard}
          classNameC={styles.cards}
        />
      </>
      <Footer />
    </>
  );
}

export default seeMap;
