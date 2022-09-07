import { useEffect, useRef } from "react";
import L from "leaflet";
import glify from "leaflet.glify";

import styles from "./mapView.module.css";
import {
  useLeafletEvent,
  useMap,
  useMarket,
  usePolyline,
} from "../../service/leaflet";

function MapView({ mapCords, track, setPoint, pointChart }) {
  const geojson = { type: "FeatureCollection", features: [] };
  const polyline = [];

  const icon = L.divIcon({
    iconSize: [12, 12],
    className: styles.icon,
    //darle estilos mas chulos
  });

  for (let index = 0; index < track.length; index++) {
    geojson.features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat(track[index].lat),
          parseFloat(track[index].lon),
        ],
      },
      properties: {
        position: index,
      },
    });
    polyline.push([track[index].lat, track[index].lon]);
  }

  // Map refs:

  const polylineRef = useRef(null);
  const mapRef = useRef(null);
  const marketRef = useRef(null);
  const mapElementRef = useRef(null);

  //map and plugin

  useEffect(() => {
    // Map
    mapRef.current = useMap(mapCords, 10, mapElementRef);

    //map event
    useLeafletEvent(
      "click",
      function (ev) {
        console.log("s");
        if (marketRef.current !== null) {
          marketRef.current.remove();
          marketRef.current = null;
        }
      },
      mapRef
    );

    //glify points
    glify.points({
      map: mapRef.current,
      data: geojson,
      size: 10,
      color: { r: 0, g: 0, b: 255, a: 1 },
      className: styles.point,
      click: (e, feature) => {
        setPoint(feature.properties.position);
      },
    });

    //polyline
    polylineRef.current = usePolyline(mapRef, polyline);
    //center la polyline in of map
    mapRef.current.fitBounds(polylineRef.current.getBounds());
  }, []);

  useEffect(() => {
    if (pointChart) {
      if (marketRef.current === null) {
        marketRef.current = useMarket(
          mapRef,
          polyline[pointChart],
          styles.icon,
          [12, 12]
        );
      } else {
        marketRef.current.setLatLng(polyline[pointChart]);
      }
    }
  }, [pointChart]);

  return (
    <>
      <div ref={mapElementRef} className={styles.map} />
    </>
  );
}

export default MapView;

//37.13095924817025661468505859375;
//37.13093435391784;
