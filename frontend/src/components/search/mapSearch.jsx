import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import { getPosition } from "../../utility/geolocation";

import styles from "../seeMap/mapSeeMap.module.css";
import "leaflet/dist/leaflet.css";
import PError from "../pError";
import { useLeafletEvent, useMap } from "../../service/leaflet";

function MapSearch({
  mapCords,
  ruteData,
  cardData,
  setCardData,
  hoverCard,
  setHoverCard,
}) {
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  // Map refs:
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const hoverMarkerRef = useRef(null);
  const featureGroupRef = useRef(null);
  const mapElementRef = useRef(null);

  //icon object
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

  useEffect(() => {
    getPosition()
      .then((position) => {
        SetGpsMapCords([position.coords.latitude, position.coords.longitude]);
      })
      .catch((err) => {
        setErr("No se ha podido obtener su localizacion");
      });
  }, []);

  // Map creation
  useEffect(() => {
    //map
    mapRef.current = useMap(mapCords, 10, mapElementRef);

    //map event click
    useLeafletEvent(
      "click",
      () => {
        if (hoverMarkerRef.current !== null) {
          hoverMarkerRef.current.remove();
          hoverMarkerRef.current = null;
          setHoverCard(null);
        }
      },
      mapRef
    );
    //map event filter map rutes
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
      //add market
      markerRef.current = L.marker([ruteData[index].lat, ruteData[index].lon], {
        icon: ObjetIcon.icon,
      });
      //add event click redirect to rute
      useLeafletEvent(
        "click",
        () => {
          navigate(`/app/view?rute=${ruteData[index]._id}`);
        },
        markerRef
      );

      //add event mouseover  sort rutes when hover in the rute
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

      //add markes

      cardVisble.push(ruteData[index]);
      markes.push(markerRef.current);
    }
    //center
    setCardData(cardVisble);
    if (markes.length > 0) {
      featureGroupRef.current = L.featureGroup(markes).addTo(mapRef.current);
      mapRef.current.fitBounds(featureGroupRef.current.getBounds());
    }
  }, []);
  //add point red in map of card rute in hover
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

export default MapSearch;
