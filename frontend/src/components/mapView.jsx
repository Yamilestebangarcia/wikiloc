import {
  MapContainer,
  TileLayer,
  LayersControl,
  Polyline,
  /*  Marker, */
} from "react-leaflet";

/*import L from "leaflet";

 const icon = L.divIcon({
  iconSize: [8, 8],
  className: "my-div-icon",
  //darle estilos mas chulos
}); */
const { BaseLayer } = LayersControl;

function MapView({ mapCords, track }) {
  /*   const polyline = [];

  track.forEach((cord) => {
    polyline.push([cord.lat, cord.lon]);
  });
 */
  return (
    <MapContainer center={mapCords} zoom={10} attributionControl={false}>
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
    </MapContainer>
  );
}

export default MapView;
