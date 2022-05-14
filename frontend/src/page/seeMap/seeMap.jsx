import { useEffect, useState } from "react";
import CardRoute from "../../components/cardRute";
import Footer from "../../components/footer";
import Header from "../../components/header";
import MapSee from "../../components/mapSee";
import { useNavigate } from "react-router-dom";
import { getPosition } from "../../utility/geolocation";

function seeMap() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [ruteData, setRuteData] = useState(null);
  const [cardData, setCardData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(async () => {
    let dataGps;
    try {
      dataGps = await getPosition();
    } catch (error) {
      dataGps = null;
    }

    fetch("http://localhost:3001/app/seemap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
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
      })
      .catch((err) => {
        setRuteData(null);
        setErr("No se pudo conectar");
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header />
      <h2>buscar rutas en el mapa</h2>

      <div>
        {ruteData ? (
          <MapSee
            mapCords={ruteData.mapCords}
            ruteData={ruteData}
            cardData={cardData}
            setCardData={setCardData}
          />
        ) : (
          <p>cargando..</p>
        )}
        {err ? <p>{err}</p> : null}

        <div>
          {cardData
            ? cardData.map((ele) => {
                return <CardRoute key={ele._id} data={ele} />;
              })
            : null}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default seeMap;
