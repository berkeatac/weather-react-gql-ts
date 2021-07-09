import { Coordinates } from "../../generated/graphql";
import { MapContainer, TileLayer } from "react-leaflet";

const mapProps = {
  doubleClickZoom: false,
  closePopupOnClick: false,
  dragging: false,
  trackResize: false,
  touchZoom: false,
  scrollWheelZoom: false,
  zoomControl: false,
  zoom: 13,
  attributionControl: false,
};

type CardMapProps = {
  coord: Coordinates;
};

const CardMap = ({ coord }: CardMapProps) => {
  if (!coord) return null;
  return (
    <div className="flex justify-center">
      <MapContainer
        className=" h-48 w-full lg:h-48 lg:w-48 lg:mb-0 mb-3 rounded-xl"
        center={[coord?.lat || 51.505, coord?.lon || -0.09]}
        {...mapProps}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default CardMap;
