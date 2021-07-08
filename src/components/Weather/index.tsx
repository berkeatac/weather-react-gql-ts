import { useEffect, useState, useRef } from "react";
import { useGetCityByNameLazyQuery } from "../../generated/graphql";
import _ from "lodash";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const mapProps = {
  doubleClickZoom: false,
  closePopupOnClick: false,
  dragging: false,
  trackResize: false,
  touchZoom: false,
  scrollWheelZoom: false,
  zoomControl: false,
};

const Weather = () => {
  const [city, setCity] = useState("Munich");

  const [getCity, { data, loading, error }] = useGetCityByNameLazyQuery({
    variables: {
      name: city,
    },
  });

  const debouncedGetCity = useRef(_.debounce(getCity, 1000));

  useEffect(() => {
    debouncedGetCity.current({ variables: { name: city } });
  }, [city]);

  if (error) {
    return <div>{error.message}</div>;
  }

  const weather = data?.getCityByName?.weather;
  const summary = weather?.summary;
  const temperature = weather?.temperature;

  return (
    <div>
      <h1 className="text-lg font-medium text-gray-900 m-4">
        Weather Information
      </h1>
      <input
        className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="City Name"
        onChange={(e) => setCity(e.target.value)}
        value={city}
      ></input>
      {!loading && (
        <>
          {summary && (
            <>
              <h2>{summary.title}</h2>
              <p>{summary.description}</p>
            </>
          )}
          {temperature && (
            <>
              <h4>{temperature.actual}</h4>
              <ul>
                <li>
                  <b>Feels like</b>: {temperature.feelsLike}
                </li>
                <li>
                  <b>Min</b>: {temperature.min}
                </li>
                <li>
                  <b>Max</b>: {temperature.max}
                </li>
              </ul>
            </>
          )}
          {data?.getCityByName?.coord && (
            <div className="flex justify-center">
              <MapContainer
                style={{ height: "30vh", width: "60vh" }}
                center={[
                  data?.getCityByName?.coord?.lat || 51.505,
                  data?.getCityByName?.coord?.lon || -0.09,
                ]}
                zoom={13}
                {...mapProps}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[
                    data?.getCityByName?.coord?.lat || 51.505,
                    data?.getCityByName?.coord?.lon || -0.09,
                  ]}
                >
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Weather;
