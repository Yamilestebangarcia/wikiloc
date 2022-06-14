import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import CardsRoutes from "../../components/cardsRutes";
import Header from "../../components/header";
import MapSearch from "../../components/mapSearch";

import PanelControlSearch from "../../components/PanelControlSearch";
import Spinner from "../../components/spinner";
import { useFetchIndexApp } from "../../service/useFetch";
import { filterData } from "../../service/utility";

import styles from "./search.module.css";

function Search() {
  //navigation ,params and token
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const search = searchParams.get("search");
  const token = window.sessionStorage.getItem("token");

  //states
  const [mapCords, setMapCords] = useState();
  const [data, setData] = useState();
  const [cardData, setCardData] = useState();
  const [minMaxDis, setminMaxDis] = useState();
  const [minMaxSlop, setminMaxSlop] = useState();
  const [dataDifficulty, setDataDifficulty] = useState("todos");
  const [dataControl, setDataControl] = useState({
    distMax: null,
    distMin: null,
    slopeMax: null,
    slopemin: null,
    difficulty: [],
  });
  const [loading, setLoading] = useState(false);
  const [hoverCard, setHoverCard] = useState(null);

  //get data for control panel
  const getDataControl = (data) => {
    let resultData = {};
    for (let index = 0; index < data.length; index++) {
      if (index === 0) {
        resultData.difficulty = [data[index].difficulty];
        resultData.distMax = data[index].distance;
        resultData.distMin = data[index].distance;
        resultData.slopeMax = data[index].slopePositive;
        resultData.slopemin = data[index].slopePositive;
      } else {
        if (!resultData.difficulty.includes(data[index].difficulty)) {
          resultData.difficulty.push(data[index].difficulty);
        }
        if (data[index].distance > resultData.distMax) {
          resultData.distMax = data[index].distance;
        }
        if (data[index].distance < resultData.distMin) {
          resultData.distMin = data[index].distance;
        }
        if (data[index].slopePositive > resultData.slopeMax) {
          resultData.slopeMax = data[index].slopePositive;
        }
        if (data[index].slopePositive < resultData.slopemin) {
          resultData.slopemin = data[index].slopePositive;
        }
      }
    }
    // console.log(resultData);
    setDataControl(resultData);
  };

  //filter data
  useEffect(() => {
    setCardData(filterData(data, minMaxDis, minMaxSlop, dataDifficulty));
  }, [minMaxDis, minMaxSlop, dataDifficulty]);

  //fetch
  useEffect(() => {
    setLoading(true);
    useFetchIndexApp(
      "http://localhost:3001/app/find",
      { search, token },
      setLoading
    ).then((res) => {
      if (res) {
        if (res.length !== 0) {
          getDataControl(res);
          setData(res);
          setCardData(res);
          setMapCords([res[0].lat, res[0].lon]);
        } else {
          setCardData([]);
        }
      } else {
        window.sessionStorage.removeItem("token");
        navigate("/");
        return () => {
          unmounted = true;
        };
      }
    });
  }, [search]);

  return (
    <>
      <Header />
      <h2 className={styles.h2}> busquedas encontradas de {search}</h2>

      <PanelControlSearch
        dataControl={dataControl}
        setDataDifficulty={setDataDifficulty}
        setminMaxDis={setminMaxDis}
        setminMaxSlop={setminMaxSlop}
      />

      {cardData && mapCords ? (
        <>
          <MapSearch
            mapCords={mapCords}
            ruteData={cardData}
            cardData={cardData}
            setCardData={setCardData}
            hoverCard={hoverCard}
            setHoverCard={setHoverCard}
          />
        </>
      ) : null}

      <CardsRoutes cardData={cardData} setHoverCard={setHoverCard} />

      <Spinner controlClass={loading} />
      <footer />
    </>
  );
}
export default Search;
