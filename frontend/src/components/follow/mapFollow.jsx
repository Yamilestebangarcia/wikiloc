import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import flechaGps from "../../assets/img/flechaGps.svg";
import styles from "./MapFollow.module.css";
import "leaflet/dist/leaflet.css";
import {
  useMap,
  useMarket,
  usePolyline,
  useScale,
} from "../../service/leaflet";

function MapFollow({ mapCords, track, position, full, children }) {
  //creo la polyline
  const polyline = [];
  for (let index = 0; index < track.length; index++) {
    polyline.push([track[index].lat, track[index].lon]);
  }

  const icon = new L.Icon({
    iconSize: [14, 14],
    iconUrl: flechaGps,
    className: "iconHere",
  });

  //refs:
  const mapElementRef = useRef(null);
  const mapRef = useRef(null);
  const polylineRef = useRef(null);
  const markerRef = useRef(null);
  const featureGroupRef = useRef(null);

  // Map and plugins
  useEffect(() => {
    //map
    mapRef.current = useMap(mapCords, 12, mapElementRef);

    // Add polyline
    polylineRef.current = usePolyline(mapRef, polyline);

    //add feature group
    featureGroupRef.current = L.featureGroup([polylineRef.current]).addTo(
      mapRef.current
    );
    mapRef.current.fitBounds(featureGroupRef.current.getBounds());

    //Scale
    useScale(mapRef);
  }, []);

  useEffect(() => {
    if (position) {
      markerRef.current = L.marker([position.latitude, position.longitude], {
        icon: icon,
      });
      featureGroupRef.current.addLayer(markerRef.current);
      mapRef.current.fitBounds(featureGroupRef.current.getBounds());
    }
  }, [position]);

  return (
    <>
      <div ref={mapElementRef} className={full ? styles.mapFull : styles.map}>
        {children[0]}
        {children[1]}

        {position ? children[2] : null}
      </div>
    </>
  );
}

export default MapFollow;
