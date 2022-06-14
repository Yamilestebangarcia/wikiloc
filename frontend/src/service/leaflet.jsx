import L from "leaflet";

import "leaflet/dist/leaflet.css";
function useMap(mapCords, zoom, mapElementRef) {
  //tiles
  const tiles = {
    streets: L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
      {
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        attribution: "mapboxAttribution",
      }
    ),
    outdoor: L.tileLayer(
      "https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=JApHX2LYyHexQw1jhT4J",
      {
        attribution: "maptiler outdoor",
      }
    ),
    openstreet: L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "openstreetmap",
      }
    ),
    landscape: L.tileLayer(
      "https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=467b139a90ae425baeeb1a2de27167bd",
      {
        attribution: "landscape",
      }
    ),

    outdoors: L.tileLayer(
      "https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=467b139a90ae425baeeb1a2de27167bd",
      {
        attribution: "outdoors",
      }
    ),
  };

  //params map

  const mapParams = {
    center: mapCords,
    zoom: zoom,
    zoomControl: true,
    zoomSnap: 1,
    layers: [tiles.outdoor], // Start with just the base layer
    attributionControl: false,
  };

  const map = L.map(mapElementRef.current, mapParams);

  L.control
    .layers({
      OpenStreetMap: tiles.openstreet,
      landscape: tiles.landscape,
      outdoor: tiles.outdoor,
      outdoors: tiles.outdoors,
    })
    .addTo(map);
  return map;
}

function useMarket(mapRef, marketCords, classIcon, iconSize) {
  const icon = L.divIcon({
    iconSize: iconSize,
    className: classIcon,
  });

  return L.marker(marketCords, { icon: icon }).addTo(mapRef.current);
}
function useLeafletEvent(type, callback, elementRef) {
  elementRef.current.on(type, callback);
}
function usePolyline(mapRef, polyline) {
  return L.polyline(polyline, {
    color: "blue",
    weight: 4,
  }).addTo(mapRef.current);
}
function useScale(mapRef) {
  return L.control
    .scale({
      metric: true,
      imperial: false,
      maxWidth: 200,
    })
    .addTo(mapRef.current);
}

export { useMap, useMarket, useLeafletEvent, usePolyline, useScale };
