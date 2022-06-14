import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import { getPosition } from "../utility/geolocation";

import styles from "./mapSeeMap.module.css";
import "leaflet/dist/leaflet.css";
import PError from "./pError";
import { useLeafletEvent, useMap } from "../service/leaflet";

function MapSeeMap({
  mapCords,
  ruteData,
  cardData,
  setCardData,
  hoverCard,
  setHoverCard,
}) {
  // states
  const [gpsMapCords, SetGpsMapCords] = useState(mapCords);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  // Map refs:
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const hoverMarkerRef = useRef(null);
  const featureGroupRef = useRef(null);
  const mapElementRef = useRef(null);

  //icon
  const ObjetIcon = {
    icon: L.divIcon({
      iconSize: [9, 9],
      className: styles.icon,
      //darle estilos mas chulos
    }),
    iconHover: L.divIcon({
      iconSize: [10, 10],
      className: styles.iconHover,
      //darle estilos mas chulos
    }),
  };

  //get position
  useEffect(() => {
    getPosition()
      .then((position) => {
        SetGpsMapCords([position.coords.latitude, position.coords.longitude]);
      })
      .catch((err) => {
        console.log("position");
        setErr("No se ha podido obtener su localizacion");
      });
  }, []);

  // Map and plugins
  useEffect(() => {
    mapRef.current = useMap(mapCords, 10, mapElementRef);
    //add event remuve point location rute hover
    useLeafletEvent(
      "click",
      function (ev) {
        if (hoverMarkerRef.current !== null) {
          hoverMarkerRef.current.remove();
          hoverMarkerRef.current = null;
          setHoverCard(null);
        }
      },
      mapRef
    );
    //add event filter rute map
    useLeafletEvent(
      "moveend",
      () => {
        const cardVisble = [];
        for (let index = 0; index < ruteData.length; index++) {
          if (
            mapRef.current
              .getBounds()
              .contains(L.latLng(ruteData[index].lat, ruteData[index].lon))
          ) {
            cardVisble.push(ruteData[index]);
          }
        }
        setCardData(cardVisble);
      },
      mapRef
    );

    // Add market
    const markes = [];
    const cardVisble = [];

    for (let index = 0; index < ruteData.length; index++) {
      //creo market
      markerRef.current = L.marker([ruteData[index].lat, ruteData[index].lon], {
        icon: ObjetIcon.icon,
      });
      //add el evento click redirect to rute

      useLeafletEvent(
        "click",
        () => {
          navigate(`/app/view?rute=${ruteData[index]._id}`);
        },
        markerRef
      );

      //add event first element point hover in map
      useLeafletEvent(
        "mouseover",
        () => {
          cardData.sort((a) => {
            if (ruteData[index]._id === a._id) {
              return -1;
            } else {
              return 0;
            }
          });

          setCardData([...cardData]);
        },
        markerRef
      );

      if (
        mapRef.current
          .getBounds()
          .contains(L.latLng(ruteData[index].lat, ruteData[index].lon))
      ) {
        cardVisble.push(ruteData[index]);
        markes.push(markerRef.current);
      } else {
        markerRef.current.addTo(mapRef.current);
      }
    }
    setCardData(cardVisble);
    if (markes.length > 0) {
      featureGroupRef.current = L.featureGroup(markes).addTo(mapRef.current);
      mapRef.current.fitBounds(featureGroupRef.current.getBounds());
    }
  }, []);

  //add event hover a  element and create market red and tooltip
  useEffect(() => {
    if (hoverCard) {
      for (let index = 0; index < ruteData.length; index++) {
        if (ruteData[index]._id === hoverCard) {
          if (hoverMarkerRef.current === null) {
            hoverMarkerRef.current = L.marker(
              [ruteData[index].lat, ruteData[index].lon],
              {
                icon: ObjetIcon.iconHover,
              }
            ).addTo(mapRef.current);
          } else {
            hoverMarkerRef.current.setLatLng([
              ruteData[index].lat,
              ruteData[index].lon,
            ]);
          }

          hoverMarkerRef.current
            .bindTooltip(ruteData[index].title)
            .openTooltip();

          index = ruteData.length;
        }
      }
    }
  }, [hoverCard]);
  return (
    <>
      <div ref={mapElementRef} className={styles.map} />

      <PError err={err} setErr={setErr}></PError>
    </>
  );
}
export default MapSeeMap;
