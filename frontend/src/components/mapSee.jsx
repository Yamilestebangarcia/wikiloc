import { MapContainer, TileLayer, LayersControl, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";

function MapSee({ mapCords, ruteData, cardData, setCardData }) {
  const icon = L.divIcon({
    iconSize: [8, 8],
    //darle estilos mas chulos
  });

  const { BaseLayer } = LayersControl;
  if (mapCords === undefined || mapCords === null || mapCords.length !== 2) {
    mapCords = [
      "37.115266732871532440185546875",
      "-3.02677270956337451934814453125",
    ];
  }

  return (
    <div>
      <MapContainer center={mapCords} zoom={13} attributionControl={false}>
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

        {ruteData.length === 0
          ? null
          : ruteData.map((ele) => {
              return (
                <Marker
                  key={ele._id}
                  position={[ele.lat, ele.lon]}
                  icon={icon}
                  eventHandlers={{
                    click: () => {
                      //manadar a una pagina diferente o no se como un na ventana emergente o un nuevo sitio en esta pagina
                      // donde se muestre toda la informacion
                      console.log(ele._id);
                    },
                    mouseover: (e) => {
                      console.log();
                      cardData.sort((a) => {
                        if (ele._id === a._id) {
                          return -1;
                        } else {
                          return 0;
                        }
                      });

                      setCardData([...cardData]);
                    },
                  }}
                ></Marker>
              );
            })}
      </MapContainer>
    </div>
  );
}

export default MapSee;
