import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardRoute from "../../components/cardRute";
import Header from "../../components/header";
import MapSee from "../../components/mapSee";

function Search() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const token = window.sessionStorage.getItem("token");

  const [ruteFind, setRuteFind] = useState();
  const [mapCords, setMapCords] = useState();
  const [cardData, setCardData] = useState();

  useEffect(() => {
    const data = { search, token };
    fetch("http://localhost:3001/app/find", {
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
        console.log(res);
        if (res.err) {
          window.sessionStorage.removeItem("token");
          navigate("/");
        }

        if (res.length !== 0) {
          setCardData(res);
          setMapCords([res[0].lat, res[0].lon]);
          setRuteFind(res);
        } else {
          setRuteFind("no");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [search]);
  return (
    <>
      <Header />
      <h2> busquedas encontradas de {search}</h2>
      {console.log(!ruteFind)}

      {ruteFind ? (
        ruteFind === "no" ? (
          <p>No se han encontrado coincidencias</p>
        ) : (
          cardData.map((ele) => {
            return <CardRoute data={ele} key={ele._id} />;
          })
        )
      ) : (
        <p>buscando...</p>
      )}

      {ruteFind ? (
        ruteFind === "no" ? null : (
          <MapSee
            mapCords={mapCords}
            ruteData={ruteFind}
            cardData={cardData}
            setCardData={setCardData}
          />
        )
      ) : (
        <p>cargando mapa...</p>
      )}

      <footer />
    </>
  );
}
export default Search;
