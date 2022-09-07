import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMap, useMarket, useLeafletEvent } from "../../service/leaflet";

import styles from "./mapIndex.module.css";

function MapIndex({ mapCords, id }) {
  //instance of navegation
  const navigate = useNavigate();

  // Map refs
  const mapElementRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  //map and plugin

  useEffect(() => {
    // Map
    mapRef.current = useMap(mapCords, 10, mapElementRef);

    // Add market
    markerRef.current = useMarket(mapRef, mapCords, styles.icon, [9, 9]);

    //add event click market
    useLeafletEvent(
      "click",
      () => {
        navigate(`/app/view?rute=${id}`);
      },
      markerRef
    );
  }, []);

  return (
    <>
      <div ref={mapElementRef} className={styles.mapIndex} />
    </>
  );
}

export default MapIndex;
