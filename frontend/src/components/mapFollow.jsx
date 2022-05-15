import {
  MapContainer,
  TileLayer,
  LayersControl,
  Polyline,
  Marker,
  ScaleControl,
} from "react-leaflet";
import * as L from "leaflet";
import flechaGps from "../assets/img/flechaGps.svg";
import iconGps from "../assets/img/iconGps.svg";

const icon = new L.Icon({
  iconSize: [14, 14],
  iconUrl: flechaGps,
  //html: `<img src='${flechaGps}'/>`,
  className: "iconHere",
  //darle estilos mas chulos
});
const { BaseLayer } = LayersControl;

function MapFollow({ mapCords, track, marker, getPosition }) {
  return (
    <MapContainer center={mapCords} zoom={10} attributionControl={false}>
      <img
        onClick={getPosition}
        src={iconGps}
        style={{
          boxSizing: "border-box",
          height: 44,
          width: 44,
          position: "absolute",
          right: 0,
          bottom: 0,
          zIndex: 1000,
          marginRight: 10,
          marginBottom: 10,
          border: "2px solid rgba(0,0,0,0.2)",
          backgroundClip: "padding-box",
          borderRadius: 5,
          backgroundColor: "#fff",
          padding: 8,
        }}
        alt="posicion Actual"
      ></img>
      {/* pointerEvents: "none",
          cursor: "default", */}

      <ScaleControl position="bottomleft" imperial={false} />
      <LayersControl>
        <BaseLayer name="maptiler outdoor" checked>
          <TileLayer url="https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=JApHX2LYyHexQw1jhT4J" />
        </BaseLayer>
        <BaseLayer name="openstreetmap">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </BaseLayer>
        <BaseLayer name="landscape">
          <TileLayer url="https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=467b139a90ae425baeeb1a2de27167bd" />
        </BaseLayer>
        <BaseLayer name="outdoors">
          <TileLayer url="https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=467b139a90ae425baeeb1a2de27167bd" />
        </BaseLayer>
      </LayersControl>
      <Polyline pathOptions={{ color: "blue" }} positions={track} />
      {marker ? (
        <Marker position={[marker.latitude, marker.longitude]} icon={icon} />
      ) : null}
    </MapContainer>
  );
}
export default MapFollow;
