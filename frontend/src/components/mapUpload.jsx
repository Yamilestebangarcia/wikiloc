import React, { useEffect, useRef, useState } from "react";
import { useMap, usePolyline } from "../service/leaflet";

import styles from "./mapUpload.module.css";

function MapUploadq({ mapCords, track }) {
  //creation of poins polyline

  const polyline = [];

  track.forEach((cord) => {
    polyline.push([cord.lat, cord.lon]);
  });

  // Map refs:
  const mapRef = useRef(null);
  const polylineRef = useRef(null);
  const mapElementRef = useRef(null);

  // Map and plugins
  useEffect(() => {
    //map
    mapRef.current = useMap(mapCords, 10, mapElementRef);

    //polyline
    polylineRef.current = usePolyline(mapRef, polyline);
    //centro la polilinia
    mapRef.current.fitBounds(polylineRef.current.getBounds());
  }, []);

  return (
    <>
      <div ref={mapElementRef} className={styles.map} />
    </>
  );
}

export default MapUploadq;
