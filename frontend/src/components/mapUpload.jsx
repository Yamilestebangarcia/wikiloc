import {
  MapContainer,
  TileLayer,
  LayersControl,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";

function MapUpload({ mapCords, track }) {
  const colorPolyline = { color: "blue" };
  const polyline = [];

  track.forEach((cord) => {
    polyline.push([cord.lat, cord.lon]);
  });

  const { BaseLayer } = LayersControl;

  return (
    <div>
      <MapContainer
        center={[mapCords.lat, mapCords.lon]}
        zoom={13}
        attributionControl={false}
      >
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
        <Polyline pathOptions={colorPolyline} positions={polyline} />
      </MapContainer>
    </div>
  );
}

export default MapUpload;
